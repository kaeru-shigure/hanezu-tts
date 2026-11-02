"""Frame F0 estimator on the predicted log-Mel (statistics_mlp32_v1).

The release Mel mean/std normalization is folded into ``input`` (average
pooling commutes with the per-channel affine) and the LayerNorm affine is
folded into ``inner``.
"""

from __future__ import annotations

import math

import torch
import torch.nn.functional as F
from torch import nn

from .layers import gelu, layer_norm


def _reflect_indices(length: int, padding: int, device) -> torch.Tensor:
    period = max(2 * (length - 1), 1)
    positions = torch.arange(-padding, length + padding, device=device) % period
    return torch.minimum(positions, period - positions)


class PitchEstimator(nn.Module):
    def __init__(self, config: dict):
        super().__init__()
        width, channels = int(config["width"]), int(config["mel_channels"])
        self.kernels = tuple(int(k) for k in config["context_kernels"])
        self.eps = float(config["layer_norm_eps"])
        self.log_center = math.log(float(config["f0_center_hz"]))
        self.log_range = float(config["f0_log_range"])
        self.input = nn.Linear((1 + len(self.kernels)) * channels, width)
        self.inner = nn.Linear(width, width)
        self.output = nn.Linear(width, 2)

    @torch.inference_mode()
    def forward(self, mel: torch.Tensor) -> torch.Tensor:
        """[T, 96] log-Mel -> [T] F0 in Hz (always positive)."""
        T = mel.shape[0]
        contexts = [mel]
        for k in self.kernels:
            padded = mel[_reflect_indices(T, k // 2, mel.device)]
            contexts.append(F.avg_pool1d(padded.T[None], k, stride=1)[0].T)
        hidden = gelu(self.input(torch.cat(contexts, -1)))
        raw = self.output(gelu(self.inner(layer_norm(hidden, self.eps))))
        return torch.exp(self.log_center + self.log_range * torch.tanh(raw[:, 0]))
