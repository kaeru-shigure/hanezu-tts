"""Area-normalized Slaney Mel filterbank (fixed contract, no learned values)."""

from __future__ import annotations

import math

import numpy as np


def _hz_to_mel(frequency: float) -> float:
    if frequency < 1_000.0:
        return frequency / (200.0 / 3.0)
    return 15.0 + math.log(frequency / 1_000.0) / (math.log(6.4) / 27.0)


def slaney_bank(sample_rate: int, n_fft: int, channels: int, fmin: float, fmax: float) -> np.ndarray:
    """[channels, n_fft//2+1] float32 bank built in float64."""
    linear_step = 200.0 / 3.0
    log_step = math.log(6.4) / 27.0
    mel_points = np.linspace(_hz_to_mel(fmin), _hz_to_mel(fmax), channels + 2)
    hz = np.where(
        mel_points < 15.0, linear_step * mel_points, 1_000.0 * np.exp(log_step * (mel_points - 15.0))
    )
    fft = np.fft.rfftfreq(n_fft, 1.0 / sample_rate)
    left = (fft[None, :] - hz[:-2, None]) / (hz[1:-1, None] - hz[:-2, None])
    right = (hz[2:, None] - fft[None, :]) / (hz[2:, None] - hz[1:-1, None])
    triangles = np.maximum(0.0, np.minimum(left, right))
    return (triangles * (2.0 / (hz[2:] - hz[:-2]))[:, None]).astype(np.float32)
