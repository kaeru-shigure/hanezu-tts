"""Model files, device selection and the text-to-waveform synthesizer.

Model directory layout (2 files):

- ``weight.safetensors``: ``nn.<component>.*`` float32 parameters,
  ``stat.<component>.*`` fixed statistics, ``table.duration.*`` native tables
  (int32/uint8/float64).
- ``config.json``: ``contract`` (audio/frontend/Mel ABI) and ``model``
  (per-component configuration, vocabularies).
"""

from __future__ import annotations

import hashlib
import json
import math
import os
from pathlib import Path

import numpy as np
import torch
from safetensors import safe_open

from .acoustic import Acoustic
from .duration import DurationTree
from .frontend import JapaneseFrontend, split_sentences
from .pitch import PitchEstimator
from .vocoder import Vocoder

FORMAT = "hanezu-tts-v2"
MODEL_FILES = ("weight.safetensors", "config.json")
DEFAULT_REPO = "kaeru-shigure/hanezu-tts"
DEFAULT_REVISION = "419fe1f98ee69e3af5db4bf74f4a65c1fefb65fa"
MODEL_SHA256 = {
    "config.json": "177c0f59b81a4492eff69ca823903114865601c6e28c7aa78fd3c071b106db41",
    "weight.safetensors": "c5bc6ccb7eff4db539c151926efbe1130e244eef576f146e772a3f8556da14ac",
}
DEVICES = ("auto", "cpu", "cuda", "mps")
MIN_SPEED, MAX_SPEED = 0.25, 4.0


# ---------------------------------------------------------------- locations


def default_model_dir() -> Path:
    """``$HANEZU_TTS_MODEL_DIR``, else ``<hanezu-tts checkout>/models``, else ``./models``."""
    env = os.environ.get("HANEZU_TTS_MODEL_DIR")
    if env:
        return Path(env).expanduser()
    root = Path(__file__).resolve().parents[2]
    if (root / "pyproject.toml").is_file() and (root / "src" / "hanezu_tts").is_dir():
        return root / "models"
    return Path.cwd() / "models"


def _model_file_matches(path: Path, expected_hash: str | None) -> bool:
    if not path.is_file():
        return False
    if expected_hash is None:
        return True
    digest = hashlib.sha256()
    with path.open("rb") as source:
        while chunk := source.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest() == expected_hash


def ensure_model_files(model_dir: str | Path | None = None, repo_id: str | None = None) -> Path:
    """Download missing or mismatched model files from the pinned model revision."""
    directory = Path(model_dir) if model_dir else default_model_dir()
    repo = repo_id or os.environ.get("HANEZU_TTS_REPO", DEFAULT_REPO)
    revision = DEFAULT_REVISION if repo == DEFAULT_REPO else None
    hashes = MODEL_SHA256 if repo == DEFAULT_REPO else {}
    downloads = [
        name
        for name in MODEL_FILES
        if not _model_file_matches(directory / name, hashes.get(name))
    ]
    if not downloads:
        return directory
    from huggingface_hub import hf_hub_download

    directory.mkdir(parents=True, exist_ok=True)
    for name in downloads:
        try:
            hf_hub_download(
                repo_id=repo,
                filename=name,
                repo_type="model",
                revision=revision,
                local_dir=str(directory),
                force_download=(directory / name).exists(),
            )
            if not _model_file_matches(directory / name, hashes.get(name)):
                raise ValueError("downloaded model file does not match the pinned revision")
        except Exception as exc:  # noqa: BLE001 -- download failures have several providers
            raise RuntimeError(
                f"model file {name} is missing or mismatched in {directory} and could not be downloaded from "
                f"https://huggingface.co/{repo} ({type(exc).__name__}). Set --repo/HANEZU_TTS_REPO, or "
                "create the files with tools/convert_lemon_release.py."
            ) from None
    return directory


def resolve_device(name: str = "auto") -> torch.device:
    name = (name or "auto").lower()
    if name not in DEVICES:
        raise ValueError(f"device must be one of {', '.join(DEVICES)}")
    if name == "auto":
        # The graph is small and sequential (GRU, per-event FFTs); on Apple
        # Silicon CPU is faster than MPS, so auto only promotes to CUDA.
        return torch.device("cuda" if torch.cuda.is_available() else "cpu")
    if name == "cuda" and not torch.cuda.is_available():
        raise RuntimeError("CUDA is not available")
    if name == "mps" and not torch.backends.mps.is_available():
        raise RuntimeError("MPS is not available")
    return torch.device(name)


# ---------------------------------------------------------------- loading


def _load_components(
    module: torch.nn.Module, values: dict[str, np.ndarray], component: str
) -> None:
    """Strictly load ``nn.<component>.*`` parameters and ``stat.<component>.*`` buffers."""
    expected = {}
    for name, tensor in module.named_parameters():
        expected[f"nn.{component}.{name}"] = (name, tensor)
    for name, tensor in module.named_buffers():
        expected[f"stat.{component}.{name}"] = (name, tensor)
    present = {k for k in values if k.startswith((f"nn.{component}.", f"stat.{component}."))}
    missing, unexpected = sorted(set(expected) - present), sorted(present - set(expected))
    if missing or unexpected:
        raise ValueError(
            f"{component} weights differ: missing={missing[:8]} unexpected={unexpected[:8]}"
        )
    state = {}
    for key, (name, target) in expected.items():
        value = values[key]
        if value.dtype != np.float32 or tuple(value.shape) != tuple(target.shape):
            raise ValueError(
                f"{key}: got {value.dtype}{value.shape}, expected float32{tuple(target.shape)}"
            )
        if not np.isfinite(value).all():
            raise ValueError(f"{key} is not finite")
        state[name] = torch.from_numpy(value.copy())
    module.load_state_dict(state, strict=True)


class HanezuTTS:
    """朱華TTS synthesizer: ``HanezuTTS.load().synthesize("こんにちは")``."""

    def __init__(
        self, model_dir: str | Path, device: str = "auto", repo_id: str | None = None
    ):
        directory = ensure_model_files(model_dir, repo_id)
        config = json.loads((directory / "config.json").read_text("utf-8"))
        if config.get("format") != FORMAT:
            raise ValueError(
                f"unsupported model format {config.get('format')!r}; expected {FORMAT}"
            )
        values: dict[str, np.ndarray] = {}
        with safe_open(str(directory / "weight.safetensors"), framework="numpy") as handle:
            metadata = json.loads((handle.metadata() or {}).get("hanezu", "{}"))
            if metadata.get("format") != FORMAT:
                raise ValueError("weight.safetensors is not a hanezu-tts weight file")
            for key in handle.keys():  # noqa: SIM118 -- safe_open exposes keys(), not iteration
                values[key] = handle.get_tensor(key)

        self.config = config
        self.device = resolve_device(device)
        contract, model = config["contract"], config["model"]
        self.sample_rate = int(contract["audio"]["sample_rate"])
        self.hop_length = int(contract["audio"]["hop_length"])

        acoustic_config = dict(model["acoustic"]["config"], mel=contract["mel"])
        self.acoustic = Acoustic(acoustic_config)
        self.pitch = PitchEstimator(model["pitch"]["config"])
        self.vocoder = Vocoder(model["vocoder"]["config"])
        for name, module in (
            ("acoustic", self.acoustic),
            ("pitch", self.pitch),
            ("vocoder", self.vocoder),
        ):
            _load_components(module, values, name)
            module.to(self.device).eval()
        tables = {
            k.removeprefix("table.duration."): v
            for k, v in values.items()
            if k.startswith("table.duration.")
        }
        self.duration = DurationTree(tables, model["duration"])
        leftover = [k for k in values if not k.startswith(("nn.", "stat.", "table.duration."))]
        if leftover:
            raise ValueError(f"unexpected weight keys: {leftover[:8]}")
        self.frontend = JapaneseFrontend(contract["frontend"])

    @classmethod
    def load(
        cls, model_dir: str | Path | None = None, device: str = "auto", repo_id: str | None = None
    ) -> HanezuTTS:
        return cls(model_dir or default_model_dir(), device, repo_id=repo_id)

    def _sentence(self, text: str, speed: float) -> np.ndarray:
        encoded = self.frontend.encode(text, preprocessed=True)
        durations = self.duration.predict(
            encoded.phone_ids, encoded.features, encoded.phone_word_ids, encoded.words
        )
        if speed != 1.0:
            durations = np.maximum(np.round(durations.astype(np.float32) / speed), 1).astype(
                np.int64
            )
        condition = self.acoustic(
            encoded.phone_ids,
            encoded.features,
            encoded.phone_word_ids,
            encoded.word_features,
            durations,
        )
        f0 = self.pitch(condition[:, :96])
        waveform = self.vocoder(condition, f0)
        return waveform.float().cpu().numpy()

    def synthesize(self, text: str, speed: float = 1.0) -> np.ndarray:
        """Return mono float32 audio at ``self.sample_rate``.

        ``speed`` (alpha) scales the speaking rate: 2.0 is twice as fast and
        0.5 half as fast; every phone keeps at least one frame.
        """
        if not isinstance(text, str) or not text.strip():
            raise ValueError("text must be a non-empty string")
        speed = float(speed)
        if not math.isfinite(speed) or not MIN_SPEED <= speed <= MAX_SPEED:
            raise ValueError(f"speed must be within [{MIN_SPEED}, {MAX_SPEED}]")
        chunks = split_sentences(text)
        if not chunks:
            raise ValueError("text must contain speakable characters")
        pieces = [self._sentence(chunk, speed) for chunk in chunks]
        # Each sentence already owns a fresh float32 waveform.
        return pieces[0] if len(pieces) == 1 else np.concatenate(pieces)
