from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np
import torch
from torch import nn

from .layers import (
    Conv,
    ConvBlock,
    ConvNeXtV2Block,
    SinCosConvNeXtV2Block,
    gelu,
)
from .mel import slaney_bank
from .mora_pitch import R30Pitch

PAU, SIL, QUESTION = 2, 1, 48
N_PHONES = 49


def is_speech(ids):
    return (ids > PAU) & (ids < QUESTION)


def is_pause(ids):
    return (ids == SIL) | (ids == PAU) | (ids == QUESTION)


# ---------------------------------------------------------------- host geometry


@dataclass(frozen=True)
class Geometry:
    phone_index: np.ndarray  # [T] phone of each frame
    fraction: np.ndarray  # [T] position in phone, [0,1)
    groups: np.ndarray  # [P] mora group of each phone
    units: int  # number of mora groups
    frame_groups: np.ndarray  # [T]
    knot_index: np.ndarray  # [T]
    knot_alpha: np.ndarray  # [T]


def mora_groups(ids: np.ndarray) -> np.ndarray:
    n = len(ids)
    nonspeech = is_pause(ids)
    terminal = (ids >= 3) & (ids <= 14)
    next_pause = np.append(nonspeech[1:], False)
    last = np.arange(n) == n - 1
    close = (nonspeech | terminal | next_pause | last).astype(np.int64)
    return np.cumsum(close) - close


def geometry(ids: np.ndarray, durations: np.ndarray) -> Geometry:
    frames = int(durations.sum())
    phone_index = np.repeat(np.arange(len(ids)), durations)
    starts = (np.cumsum(durations) - durations)[phone_index]
    fraction = ((np.arange(frames) - starts) / np.maximum(durations[phone_index], 1)).astype(
        np.float32
    )
    groups = mora_groups(ids)
    units = int(groups.max()) + 1
    fg = groups[phone_index]
    lengths = np.bincount(fg, minlength=len(ids)).astype(np.float32)
    gstart = np.cumsum(lengths) - lengths
    n = lengths[fg]
    position = (np.arange(frames, dtype=np.float32) - gstart[fg]) / np.maximum(n - 1, 1)
    position = np.where(n == 1, 0.5, np.clip(position, 0, 1)).astype(np.float32)
    upper = position > 0.5
    index = 2 * fg + upper.astype(np.int64)
    alpha = np.where(upper, 2 * position - 1, 2 * position).astype(np.float32)
    return Geometry(phone_index, fraction, groups, units, fg, index, alpha)


def expansion_matrix(knots: int, width: int = 96) -> np.ndarray:
    """Fixed piecewise-linear band interpolation [knots, 96] (no learned bins)."""
    position = np.linspace(0, knots - 1, width, dtype=np.float32)
    left = np.floor(position).astype(np.int64)
    right = np.minimum(left + 1, knots - 1)
    fraction = (position - left).astype(np.float32)
    matrix = np.zeros((knots, width), np.float32)
    matrix[left, np.arange(width)] += 1 - fraction
    matrix[right, np.arange(width)] += fraction
    return matrix


# ---------------------------------------------------------------- submodules


def _blocks(width, inner, kernels, dilations, eps=1e-5):
    return nn.ModuleList(
        ConvBlock(width, inner, k, d, eps) for k, d in zip(kernels, dilations, strict=True)
    )


class Voicing(nn.Module):
    def __init__(self):
        super().__init__()
        self.duration = nn.Parameter(torch.empty(32))
        self.position = nn.Linear(3, 32, bias=False)
        self.token_blocks = _blocks(32, 64, (5, 5, 5), (1, 2, 1))
        self.frame_blocks = _blocks(32, 64, (3, 3), (1, 2))
        self.output = nn.Linear(32, 1)


class Energy(nn.Module):
    def __init__(self):
        super().__init__()
        self.frame_in = nn.Linear(96, 96)  # [frame head | delta trunk]
        self.frame_block = ConvBlock(48, 96, 3)
        self.frame_out = nn.Linear(48, 1)
        self.delta_block = ConvBlock(48, 96, 3)
        self.delta_out = nn.Linear(48, 1)
        self.token_in = nn.Linear(96, 96)  # [phone contour trunk | energy budget]
        self.coarse_blocks = _blocks(48, 96, (9, 17), (1, 1))
        self.coarse_out = nn.Linear(48, 2)
        self.budget_blocks = _blocks(48, 96, (9, 17), (1, 1))
        self.budget_global = nn.Linear(48, 1)
        self.budget_coarse = nn.Linear(48, 1, bias=False)
        self.budget_local = nn.Linear(48, 3)


class Decoder(nn.Module):
    def __init__(self, layers: int = 6, width: int = 96):
        super().__init__()
        if layers != 6 or width != 96:
            raise ValueError("acoustic decoder requires width96 and six FiLM layers")
        self.layers = layers
        self.used_proj = nn.Linear(3, 32 + 32 + layers * 64 + layers * 2 * width)
        self.transfer_blocks = _blocks(32, 64, (3, 7), (1, 3))
        self.transfer_rank = nn.Linear(32, 16, bias=False)
        self.adapter_temporal = Conv(32, 32, 5)
        self.adapter_rank = nn.Linear(32, 16, bias=False)
        self.cond_out = nn.Linear(32, layers * 2 * width)
        self.mod_rank = nn.Parameter(torch.empty(layers, 16, 64))
        self.mod_out = nn.Parameter(torch.empty(layers, 2 * width, 16))
        self.input = nn.Linear(width + 3, width)
        self.blocks = nn.ModuleList(
            [
                ConvNeXtV2Block(128, 394, 13, 1e-6, residual_width=width),
                ConvNeXtV2Block(128, 394, 13, 1e-6, residual_width=width),
                SinCosConvNeXtV2Block(128, 261, 13, 1e-6, residual_width=width),
            ]
        )
        self.output = nn.Linear(width, 32)  # [envelope 16 | noise 8 | mixture 8]

    def modulations(self, used: torch.Tensor) -> torch.Tensor:
        T, L = used.shape[0], self.layers
        t, a, m, linear = self.used_proj(used).split(
            [32, 32, L * 64, self.cond_out.out_features], -1
        )
        t = gelu(t)
        for block in self.transfer_blocks:
            t = block(t)
        a = gelu(self.adapter_temporal(gelu(a)))
        rank = torch.cat([self.transfer_rank(t), self.adapter_rank(a)], -1)
        m = torch.einsum("tlc,lrc->tlr", gelu(m).reshape(T, L, 64), self.mod_rank)
        m = torch.einsum("tlr,lor->tlo", m, self.mod_out)
        return (self.cond_out(rank) + linear).reshape(T, L, -1) + m


# ---------------------------------------------------------------- model


class Acoustic(nn.Module):
    def __init__(self, config: dict):
        super().__init__()
        self.config = config
        constants = config["constants"]
        self.f0_mean = float(constants["f0_mean"])
        self.f0_scale = float(constants["f0_scale"])
        self.energy_mean = float(constants["energy_mean"])
        self.energy_scale = float(constants["energy_scale"])
        self.max_frames = int(config["max_frames"])
        width = int(config["width"])
        self.width = width
        self.phone_embedding = nn.Embedding(N_PHONES, width + 32)  # [text | voicing]
        self.feature_proj = nn.Linear(8, width + 32, bias=False)
        self.position_proj = nn.Linear(3, width, bias=False)
        self.text_blocks = _blocks(width, 3 * width, (7,) * 3, tuple(config["token_dilations"]))
        self.frame_blocks = _blocks(width, 3 * width, (7,) * 4, tuple(config["frame_dilations"]))
        self.voicing = Voicing()
        self.energy = Energy()
        self.f0 = R30Pitch()
        self.decoder = Decoder(int(config["mel_decoder_layers"]), int(config["mel_decoder_width"]))
        self._mel_bank: torch.Tensor | None = None
        self._expand: dict[int, torch.Tensor] = {}

    # -- helpers -------------------------------------------------------------

    def _expansion(self, knots: int, device) -> torch.Tensor:
        if knots not in self._expand:
            self._expand[knots] = torch.from_numpy(expansion_matrix(knots)).to(device)
        return self._expand[knots]

    def _bank(self, device) -> torch.Tensor:
        if self._mel_bank is None:
            mel = self.config["mel"]
            bank = slaney_bank(
                mel["sample_rate"], mel["n_fft"], mel["n_mels"], mel["fmin"], mel["fmax"]
            )
            self._mel_bank = torch.from_numpy(bank.T.copy()).to(device)
        return self._mel_bank

    # -- forward -------------------------------------------------------------

    @torch.inference_mode()
    def forward(
        self, phone_ids, features, phone_word_ids, word_features, durations
    ) -> torch.Tensor:
        """Return the shared [T, 384] condition: (log-Mel, harmonic, noise, alpha)."""
        device = self.phone_embedding.weight.device
        ids_np = np.asarray(phone_ids, np.int64)
        dur_np = np.asarray(durations, np.int64)
        wids_np = np.asarray(phone_word_ids, np.int64)
        if np.any(dur_np < 1):
            raise ValueError("every phone needs at least one frame")
        frames = int(dur_np.sum())
        if frames > self.max_frames:
            raise ValueError(f"utterance too long ({frames} > {self.max_frames} frames)")
        geo = geometry(ids_np, dur_np)

        t = lambda a, dt=torch.float32: torch.as_tensor(a, dtype=dt, device=device)
        ids = t(ids_np, torch.long)
        feats = t(features)
        dur = t(dur_np)
        phone_index = t(geo.phone_index, torch.long)
        fraction = t(geo.fraction)
        speech_tok = is_speech(ids)
        speech_frame = speech_tok[phone_index]

        # text context and voicing token states share embedding/feature projections
        emb = self.phone_embedding(ids) + self.feature_proj(feats)
        text = emb[:, : self.width]
        for block in self.text_blocks:
            text = block(text)
        vtok = emb[:, self.width :] + torch.log1p(dur)[:, None] / 4.0 * self.voicing.duration
        for block in self.voicing.token_blocks:
            vtok = block(vtok)

        phone_geometry = torch.stack(
            [fraction, torch.sin(2 * math.pi * fraction), torch.cos(2 * math.pi * fraction)], -1
        )
        u = t(((geo.knot_index % 2).astype(np.float32) + geo.knot_alpha) / 2.0)
        frame_features = feats[phone_index]
        fw, bw = (frame_features[:, 1] * 30).round(), (frame_features[:, 2] * 30).round()
        progress = (torch.clamp(fw - 1, min=0) + u) / (fw + bw - 1).clamp_min(1)
        progress = torch.where((fw > 0) & (bw > 0) & speech_frame, progress.clamp(0, 1), 0.5)
        local_geometry = torch.stack([fraction, 2 * u - 1, 2 * progress - 1], -1)
        hidden = text[phone_index] + self.position_proj(local_geometry)
        for block in self.frame_blocks:
            hidden = block(hidden)
        voiced = vtok[phone_index] + self.voicing.position(phone_geometry)
        for block in self.voicing.frame_blocks:
            voiced = block(voiced)
        uv = self.voicing.output(voiced)[:, 0]

        energy = self._energy(hidden, text, speech_tok, speech_frame, phone_index, fraction)
        f0 = self._pitch(
            ids,
            feats,
            text,
            wids_np,
            word_features,
            geo,
            speech_frame,
            torch.sigmoid(uv),
        )
        used = torch.stack([f0, torch.sigmoid(uv), energy], -1)
        return self._decode(hidden, used)

    def _energy(self, hidden, text, speech_tok, speech_frame, phone_index, fraction):
        e = self.energy
        frame_h, delta_h = gelu(e.frame_in(hidden)).split(48, -1)
        frame = e.frame_out(e.frame_block(frame_h))[:, 0]
        delta = e.delta_out(e.delta_block(delta_h))[:, 0]
        coarse_h, budget_h = gelu(e.token_in(text)).split(48, -1)
        for block in e.coarse_blocks:
            coarse_h = block(coarse_h)
        coarse = e.coarse_out(coarse_h)[phone_index]
        raw = frame + coarse[:, 0] + coarse[:, 1] * (2 * fraction - 1) + 0.25 * torch.tanh(delta)

        hc = budget_h
        for block in e.budget_blocks:
            hc = block(hc)
        sp = speech_tok.to(hc.dtype)
        pooled = (hc * sp[:, None]).sum(0) / torch.clamp(sp.sum(), min=1)
        g = e.budget_global(pooled)[0] * self.energy_scale + self.energy_mean
        cf = e.budget_coarse(hc)[phone_index, 0]
        lc = e.budget_local(budget_h)[phone_index]
        shape = (
            cf
            + lc[:, 0]
            + lc[:, 1] * (2 * fraction - 1)
            + lc[:, 2] * (6 * fraction * fraction - 6 * fraction + 1)
        ) * self.energy_scale
        # power anchor over speech frames
        if bool(speech_frame.any()):
            z = 2 * shape
            peak = z[speech_frame].max()
            total = torch.exp(z - peak)[speech_frame].sum()
            center = 0.5 * (
                peak + torch.log(torch.clamp(total, min=1e-30)) - math.log(int(speech_frame.sum()))
            )
        else:
            center = torch.zeros((), device=shape.device)
        normalized = (g + shape - center - self.energy_mean) / self.energy_scale
        return torch.where(speech_frame, normalized, raw)

    def _pitch(self, ids, feats, text, wids_np, word_features, geo, speech_frame, voicing):
        durations = np.bincount(geo.phone_index, minlength=len(ids)).astype(np.int64)
        return self.f0(ids, feats, wids_np, word_features, durations, geo)

    def _harmonic_template(self, used0):
        device = used0.device
        f0 = torch.clamp(torch.exp(used0 * self.f0_scale + self.f0_mean), 50.0, 1000.0)
        k = torch.arange(1, 222, dtype=torch.float32, device=device)
        frequency = f0[:, None] * k
        valid = frequency <= 11025.0
        bins = frequency * (1024.0 / 22050.0)
        left = torch.floor(bins)
        fraction = bins - left
        left = torch.clamp(left.long(), 0, 512)
        right = torch.clamp(left + 1, max=512)
        amplitude = valid.to(torch.float32) / k
        spectrum = torch.zeros(f0.shape[0], 513, device=device)
        spectrum.scatter_add_(1, left, amplitude * (1 - fraction))
        spectrum.scatter_add_(1, right, amplitude * fraction)
        mel = spectrum @ self._bank(device)
        return mel / torch.clamp(mel.mean(-1, keepdim=True), min=1e-12)

    def _decode(self, hidden, used):
        d = self.decoder
        modulation = d.modulations(used)
        x = gelu(d.input(torch.cat([hidden, used], -1)))
        for index, group in enumerate((0, 1, 2, 0, 1, 2)):
            x = d.blocks[group](x)
            gamma, beta = modulation[:, index].chunk(2, -1)
            x = x * (1 + 0.1 * torch.tanh(gamma)) + 0.1 * beta
        envelope, noise, mixture = d.output(x).split([16, 8, 8], -1)
        device = x.device
        envelope = envelope @ self._expansion(16, device)
        noise = torch.exp(4.0 * torch.tanh(noise)) @ self._expansion(8, device)
        noise = noise / noise.mean(-1, keepdim=True)
        periodic = 0.25 + 0.7 * torch.sigmoid(mixture @ self._expansion(8, device))
        alpha = used[:, 1:2] * periodic
        harmonic = self._harmonic_template(used[:, 0])
        mel = envelope + torch.log(alpha * harmonic + (1.0 - alpha) * noise + 1.0e-5)
        return torch.cat([mel, harmonic, noise, alpha], -1)
