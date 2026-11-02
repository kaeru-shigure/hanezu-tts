"""WAV encoding helpers."""

from __future__ import annotations

import io

import numpy as np
import soundfile as sf


def wav_bytes(waveform: np.ndarray, sample_rate: int) -> bytes:
    buffer = io.BytesIO()
    sf.write(buffer, np.clip(waveform, -1.0, 1.0), sample_rate, format="WAV", subtype="PCM_16")
    return buffer.getvalue()
