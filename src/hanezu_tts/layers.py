"""Fused building blocks shared by the acoustic, pitch and vocoder graphs.

All modules operate on a single utterance in channels-last ``[T, C]`` layout.
LayerNorm affine terms, residual scales and GRN biases were folded into the
adjacent Linear layers by the release converter, so the blocks below carry no
separately stored per-channel affine vectors where they are mathematically
redundant.
"""

from __future__ import annotations

import math

import torch
import torch.nn.functional as F
from torch import nn


def gelu(x: torch.Tensor) -> torch.Tensor:
    return F.gelu(x)  # exact erf form


def layer_norm(x: torch.Tensor, eps: float) -> torch.Tensor:
    return F.layer_norm(x, (x.shape[-1],), eps=eps)


def sinusoidal_positions(length: int, width: int, device: torch.device) -> torch.Tensor:
    positions = torch.arange(length, dtype=torch.float32, device=device)[:, None]
    inverse = torch.exp(
        torch.arange(0, width, 2, dtype=torch.float32, device=device) * (-math.log(10_000.0) / width)
    )
    angle = positions * inverse
    return torch.stack([torch.sin(angle), torch.cos(angle)], dim=-1).reshape(length, width)


class DepthwiseConv(nn.Module):
    """Same-length depthwise temporal convolution on ``[T, C]``."""

    def __init__(self, channels: int, kernel_size: int, dilation: int = 1):
        super().__init__()
        self.padding = (kernel_size // 2) * dilation
        self.dilation = dilation
        self.weight = nn.Parameter(torch.empty(channels, 1, kernel_size))
        self.bias = nn.Parameter(torch.empty(channels))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        y = F.conv1d(
            x.T[None], self.weight, self.bias,
            padding=self.padding, dilation=self.dilation, groups=x.shape[-1],
        )
        return y[0].T


class Conv(nn.Module):
    """Dense or grouped same-length convolution on ``[T, C]`` (zero padding)."""

    def __init__(self, cin: int, cout: int, kernel_size: int, groups: int = 1):
        super().__init__()
        self.padding = kernel_size // 2
        self.groups = groups
        self.weight = nn.Parameter(torch.empty(cout, cin // groups, kernel_size))
        self.bias = nn.Parameter(torch.empty(cout))

    def forward(self, x: torch.Tensor, *, reflect: bool = False) -> torch.Tensor:
        x = x.T[None]
        if reflect:
            x = F.pad(x, (self.padding, self.padding), mode="reflect")
            y = F.conv1d(x, self.weight, self.bias, groups=self.groups)
        else:
            y = F.conv1d(x, self.weight, self.bias, padding=self.padding, groups=self.groups)
        return y[0].T


class ConvBlock(nn.Module):
    """ConvNeXt block: DWConv -> LN -> Linear -> GELU -> Linear (+ residual).

    The LN affine is folded into ``up`` and the residual scale into ``down``.
    """

    def __init__(self, width: int, inner: int, kernel_size: int, dilation: int = 1, eps: float = 1e-5):
        super().__init__()
        self.eps = eps
        self.depth = DepthwiseConv(width, kernel_size, dilation)
        self.up = nn.Linear(width, inner)
        self.down = nn.Linear(inner, width)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        h = layer_norm(self.depth(x), self.eps)
        return x + self.down(gelu(self.up(h)))


def global_response(h: torch.Tensor, gamma: torch.Tensor) -> torch.Tensor:
    """ConvNeXt V2 GRN over time; its beta is folded into the following Linear."""
    response = torch.sqrt(torch.clamp((h * h).sum(dim=0, keepdim=True), min=1.0e-12))
    normalized = response / (response.mean(dim=-1, keepdim=True) + 1.0e-6)
    return h + gamma * (h * normalized)


class ConvNeXtV2Block(nn.Module):
    """[enter] -> DWConv -> LN -> Linear -> GELU -> GRN -> Linear (+ residual).

    For the acoustic decoder the original ``down`` (inner->128) and ``leave``
    (128->96) projections are a single fused ``out`` Linear (inner->96).
    """

    def __init__(self, width: int, inner: int, kernel_size: int, eps: float, residual_width: int | None = None):
        super().__init__()
        self.eps = eps
        self.enter = nn.Linear(residual_width, width) if residual_width else None
        self.depth = DepthwiseConv(width, kernel_size)
        self.up = nn.Linear(width, inner)
        self.gamma = nn.Parameter(torch.empty(inner))
        self.out = nn.Linear(inner, residual_width or width)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        h = self.enter(x) if self.enter is not None else x
        h = gelu(self.up(layer_norm(self.depth(h), self.eps)))
        return x + self.out(global_response(h, self.gamma))


class Additive(nn.Module):
    """Fastformer-style additive global mixer; query/key share one fused Linear.

    The pre-LN affines are folded into ``qk`` and ``up``.
    """

    def __init__(self, width: int, heads: int = 4):
        super().__init__()
        self.width, self.heads, self.dim = width, heads, width // heads
        self.qk = nn.Linear(width, 2 * width)
        self.query_score = nn.Parameter(torch.empty(heads, self.dim))
        self.key_score = nn.Parameter(torch.empty(heads, self.dim))
        self.output = nn.Linear(width, width)
        self.up = nn.Linear(width, 2 * width)
        self.down = nn.Linear(2 * width, width)

    def forward(self, h: torch.Tensor, mask: torch.Tensor) -> torch.Tensor:
        n = h.shape[0]
        m = mask[:, None].to(h.dtype)
        q, k = self.qk(layer_norm(h, 1e-6)).split(self.width, dim=-1)
        q = q.reshape(n, self.heads, self.dim)
        k = k.reshape(n, self.heads, self.dim)
        scale = math.sqrt(self.dim)
        if n == 1:
            alpha = m
        else:
            score = (q * self.query_score).sum(-1) / scale
            alpha = torch.softmax(torch.where(mask[:, None], score, torch.full_like(score, -1e9)), dim=0)
        global_q = (q * alpha[..., None]).sum(0, keepdim=True)
        p = k * global_q
        if n == 1:
            beta = m
        else:
            score = (p * self.key_score).sum(-1) / scale
            beta = torch.softmax(torch.where(mask[:, None], score, torch.full_like(score, -1e9)), dim=0)
        global_k = (p * beta[..., None]).sum(0, keepdim=True)
        context = (q * global_k).reshape(n, self.width)
        h = (h + self.output(context)) * m
        return (h + self.down(gelu(self.up(layer_norm(h, 1e-6))))) * m


class AffineNorm(nn.Module):
    """LayerNorm whose affine cannot be folded (its output feeds a residual/gather)."""

    def __init__(self, width: int, eps: float):
        super().__init__()
        self.eps = eps
        self.weight = nn.Parameter(torch.empty(width))
        self.bias = nn.Parameter(torch.empty(width))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return F.layer_norm(x, (x.shape[-1],), self.weight, self.bias, self.eps)
