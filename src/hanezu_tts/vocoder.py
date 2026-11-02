"""Pitch-synchronous harmonic/noise Fourier vocoder (ConvNeXt V2, shared 0123 groups).

Fused tensors (versus the source release):
- ``input_proj``: the condition Linear (after the grouped Mel conv) and the
  carrier ``source_out`` Linear act on one concatenated feature.
- ``output``: the final LayerNorm affine is folded in.
- block ``out``: the GRN beta is folded into the down projection.

Float64 phase clocks are computed with NumPy on the host, so every device
(CPU/CUDA/MPS) sees the same event geometry.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np
import torch
import torch.nn.functional as F
from torch import nn

from .layers import AffineNorm, Conv, ConvNeXtV2Block, gelu, layer_norm

INITIAL_PHASE = 0.371


# Bound event workspaces independently of utterance length.
EVENT_BATCH_SIZE = 128


@dataclass(frozen=True)
class EventBucket:
    n_fft: int
    centers: np.ndarray
    starts: np.ndarray
    cycles: np.ndarray

    def windows(self, clock: np.ndarray, offset: int, count: int):
        """Materialize just one batch using the original float64 event geometry."""
        selected = slice(offset, offset + count)
        indices = self.starts[selected, None] + np.arange(self.n_fft)
        valid = (indices >= 0) & (indices < len(clock))
        np.clip(indices, 0, len(clock) - 1, out=indices)
        delta = clock[indices] - self.cycles[selected, None]
        window = np.where(valid & (np.abs(delta) < 1), np.cos(np.pi * 0.5 * delta) ** 2, 0)
        return indices, window.astype(np.float32)


def event_plan(cycles: np.ndarray, base_fft: int) -> list[EventBucket]:
    """Store three scalars per event; build pitch-dependent windows when consumed."""
    values = np.arange(int(np.floor(cycles[0])), int(np.ceil(cycles[-1])) + 1)
    lower = np.searchsorted(cycles, values - 1, side="right")
    upper = np.searchsorted(cycles, values + 1, side="left")
    right = np.clip(np.searchsorted(cycles, values, side="left"), 1, len(cycles) - 1)
    left = right - 1
    centers = left + (values - cycles[left]) / (cycles[right] - cycles[left])
    before, after = values < cycles[0], values > cycles[-1]
    centers[before] = (values[before] - cycles[0]) / (cycles[1] - cycles[0])
    centers[after] = len(cycles) - 1 + (values[after] - cycles[-1]) / (cycles[-1] - cycles[-2])
    groups: dict[int, list] = {}
    for cycle, lo, hi, center in zip(values, lower, upper, centers):
        if hi <= lo:
            continue
        n_fft = 1 << (max(base_fft, int(hi - lo)) - 1).bit_length()
        start = (lo + hi) // 2 - n_fft // 2
        groups.setdefault(n_fft, []).append((center, start, cycle))
    return [
        EventBucket(
            n_fft,
            np.asarray([r[0] for r in rows]),
            np.asarray([r[1] for r in rows]),
            np.asarray([r[2] for r in rows]),
        )
        for n_fft, rows in sorted(groups.items())
    ]


def pseudo_noise(samples: int) -> np.ndarray:
    """Deterministic analytic pseudo-Gaussian noise (float64 hash, float32 out)."""
    index = np.arange(samples, dtype=np.float64) + 1.0
    first = np.sin(index * 12.9898) * 43_758.5453
    second = np.sin(index * 78.2330) * 12_345.6789
    first = np.clip(first - np.floor(first), 1e-6, 1.0 - 1e-6)
    second = second - np.floor(second)
    return (np.sqrt(-2.0 * np.log(first)) * np.cos(2.0 * math.pi * second)).astype(np.float32)


def linear_upsample(values: np.ndarray, factor: int) -> np.ndarray:
    """Half-pixel (align_corners=False) linear interpolation in float32."""
    frames = values.shape[0]
    if frames == 1:
        return np.repeat(values, factor)
    position = (np.arange(frames * factor, dtype=np.float32) + np.float32(0.5)) / np.float32(
        factor
    ) - np.float32(0.5)
    position = np.clip(position, np.float32(0.0), np.float32(frames - 1))
    lower = np.floor(position).astype(np.int64)
    upper = np.minimum(lower + 1, frames - 1)
    weight = position - lower.astype(np.float32)
    return (values[lower] * (np.float32(1.0) - weight) + values[upper] * weight).astype(np.float32)


class Vocoder(nn.Module):
    def __init__(self, config: dict):
        super().__init__()
        self.sample_rate = int(config["sample_rate"])
        self.hop = int(config["hop_length"])
        self.n_fft = int(config["n_fft"])
        self.bins = int(config["frequency_bins"])
        width = int(config["width"])
        eps = float(config["layer_norm_eps"])
        self.eps = eps
        self.group_order = tuple(int(g) for g in config["block_order"])
        self.condition_conv = Conv(
            4 * int(config["mel_channels"]), 96, int(config["condition_kernel_size"]), groups=4
        )
        self.source_in = nn.Linear(self.bins, int(config["source_feature_width"]))
        self.input_proj = nn.Linear(96 + int(config["source_feature_width"]), width)
        self.input_norm = AffineNorm(width, eps)
        self.blocks = nn.ModuleList(
            ConvNeXtV2Block(
                width, int(config["block_inner_width"]), int(config["block_kernel_size"]), eps
            )
            for _ in range(max(self.group_order) + 1)
        )
        self.output = nn.Linear(width, 3 * self.bins)
        # Derived runtime data, deliberately absent from the checkpoint schema.
        self._hann_window: torch.Tensor | None = None
        self._frequency_cache: dict[int, tuple[torch.Tensor, torch.Tensor, torch.Tensor]] = {}
        self._frequency_device: torch.device | None = None

    # -- sources ----------------------------------------------------------------

    def _sources(self, f0: np.ndarray):
        """Continuous 1/h harmonic+noise source, noise-only source and phase cycles."""
        samples = f0.shape[0] * self.hop
        sample_f0 = linear_upsample(f0.astype(np.float32), self.hop)
        increments = (sample_f0 / np.float32(self.sample_rate)).astype(np.float32)
        cycles = np.cumsum(increments, dtype=np.float64) + INITIAL_PHASE
        phase = np.remainder(2.0 * math.pi * cycles, 2.0 * math.pi).astype(np.float32)
        noise = pseudo_noise(samples)
        return sample_f0, phase, noise, cycles

    def _harmonic(self, sample_f0, phase, device) -> torch.Tensor:
        sf0 = torch.as_tensor(sample_f0, device=device)
        ph = torch.as_tensor(phase, device=device)
        out = torch.zeros_like(ph)
        norm = torch.zeros_like(ph)
        scratch = torch.empty_like(ph)
        weights = torch.empty_like(ph)
        mask = torch.empty_like(ph, dtype=torch.bool)
        # Tensor scalars let where(out=...) reuse its destination on every device.
        coefficients = torch.tensor([0.0] + [1.0 / k for k in range(1, 65)], device=device)
        for k in range(1, 65):
            torch.mul(sf0, k, out=scratch)
            torch.lt(scratch, self.sample_rate / 2.0, out=mask)
            torch.where(mask, coefficients[k], coefficients[0], out=weights)
            torch.mul(ph, k, out=scratch)
            scratch.sin_().mul_(weights)
            out.add_(scratch)
            torch.mul(weights, weights, out=scratch)
            norm.add_(scratch)
        return out.mul_(torch.sqrt(2.0 / torch.clamp(norm, min=1e-8)))

    def _stft_log_magnitude(self, wave: torch.Tensor) -> torch.Tensor:
        n = self.n_fft
        padded = F.pad(wave, (n // 2, n // 2))
        frames = padded.unfold(0, n, self.hop)
        window = self._hann_window
        if window is None or window.device != wave.device or window.dtype != wave.dtype:
            window = 0.5 - 0.5 * torch.cos(
                2.0 * math.pi * torch.arange(n, device=wave.device, dtype=wave.dtype) / n
            )
            self._hann_window = window
        magnitude = torch.fft.rfft(frames * window, dim=-1).abs()
        return magnitude.clamp_min_(1e-5).log_()

    # -- rendering --------------------------------------------------------------

    def _time_interpolation(self, centers, frames, device):
        position = torch.as_tensor(centers, dtype=torch.float32, device=device) / self.hop
        position.clamp_(0, frames - 1)
        lo = torch.floor(position).long()
        hi = torch.clamp(lo + 1, max=frames - 1)
        return lo, hi, (position - lo.float())[:, None]

    def _interpolate(self, values, time, n_fft):
        lo, hi, weight = time
        event = values[lo].mul_(1 - weight)
        upper = values[hi].mul_(weight)
        event.add_(upper)
        if n_fft == self.n_fft:
            return event  # The frequency grid is already identical.
        if self._frequency_device != values.device:
            self._frequency_cache.clear()
            self._frequency_device = values.device
        if n_fft not in self._frequency_cache:
            frequency = torch.arange(n_fft // 2 + 1, dtype=torch.float32, device=values.device)
            frequency.mul_(self.n_fft / n_fft)
            left = torch.floor(frequency).long()
            right = torch.clamp(left + 1, max=self.n_fft // 2)
            self._frequency_cache[n_fft] = left, right, (frequency - left.float())[None]
        left, right, fraction = self._frequency_cache[n_fft]
        lower = event[:, left].mul_(1 - fraction)
        upper = event[:, right].mul_(fraction)
        return lower.add_(upper)

    def _render(self, harmonic, noise, hcoef, ncoef, phase, plan, cycles) -> torch.Tensor:
        device = harmonic.device
        length = harmonic.shape[0]
        output = torch.zeros(length, device=device)
        denominator = torch.zeros(length, device=device)
        for bucket in plan:
            n = bucket.n_fft
            frames = torch.empty((min(EVENT_BATCH_SIZE, len(bucket.centers)), n), device=device)
            for offset in range(0, len(bucket.centers), EVENT_BATCH_SIZE):
                count = min(EVENT_BATCH_SIZE, len(bucket.centers) - offset)
                batch_indices, batch_window = bucket.windows(cycles, offset, count)
                indices = torch.as_tensor(batch_indices, dtype=torch.long, device=device)
                flat = indices.reshape(-1)
                window = torch.as_tensor(batch_window, device=device)
                time = self._time_interpolation(
                    bucket.centers[offset : offset + count], hcoef.shape[0], device
                )
                hgain = self._interpolate(hcoef, time, n)
                ngain = self._interpolate(ncoef, time, n)
                frame = frames[:count]
                torch.index_select(harmonic, 0, flat, out=frame.view(-1))
                spectrum = torch.fft.rfft(frame.mul_(window), dim=-1)
                spectrum.mul_(hgain)
                torch.index_select(noise, 0, flat, out=frame.view(-1))
                noise_spectrum = torch.fft.rfft(frame.mul_(window), dim=-1)
                noise_spectrum.mul_(ngain)
                spectrum.add_(noise_spectrum)
                del noise_spectrum
                angle = self._interpolate(phase, time, n)
                spectrum.mul_(torch.complex(torch.cos(angle), torch.sin(angle)))
                spectrum.imag[:, 0] = 0
                spectrum.imag[:, -1] = 0
                pieces = torch.fft.irfft(spectrum, n=n, dim=-1)
                pieces.mul_(window)
                output.index_add_(0, flat, pieces.reshape(-1))
                denominator.index_add_(0, flat, window.square_().reshape(-1))
        return output.div_(denominator.clamp_min_(1e-8))

    @torch.inference_mode()
    def forward(self, condition: torch.Tensor, f0: torch.Tensor) -> torch.Tensor:
        """[T, 384] acoustic condition + [T] F0 (Hz) -> [T*hop] waveform."""
        device = condition.device
        if condition.shape[0] < 4:
            raise ValueError("vocoder requires at least four frames")
        f0_np = f0.float().cpu().numpy()
        sample_f0, phase, noise_np, cycles = self._sources(f0_np)
        noise = torch.as_tensor(noise_np, device=device)
        harmonic = self._harmonic(sample_f0, phase, device)  # unit-scale periodic part
        source = 0.1 * harmonic + 0.01 * noise

        carrier = self._stft_log_magnitude(source)  # [T+1, bins]
        features = torch.cat([condition, condition[-1:]], 0)
        hidden = self.input_proj(
            torch.cat(
                [self.condition_conv(features, reflect=True), gelu(self.source_in(carrier))], -1
            )
        )
        hidden = self.input_norm(hidden)
        for group in self.group_order:
            hidden = self.blocks[group](hidden)
        raw = self.output(layer_norm(hidden, self.eps))
        hcoef = F.softplus(raw[:, : self.bins])
        ncoef = F.softplus(raw[:, self.bins : 2 * self.bins])
        phase_residual = raw[:, 2 * self.bins :]
        plan = event_plan(cycles, self.n_fft)
        # (source - noise_source)/0.1 is the pure periodic part; noise_source/0.01 is unit noise.
        return self._render(harmonic, noise, hcoef, ncoef, phase_residual, plan, cycles)
