"""Minimal PyTorch-only inference for VOICEVOX/kanalizer-model.

Architecture: e2k-style bidirectional GRU + attention, with the four
LayerNorm layers present in VOICEVOX's trained Kanalizer checkpoints.
"""

from __future__ import annotations

import json
from string import ascii_lowercase

import torch
from huggingface_hub import hf_hub_download
from safetensors.torch import load_file
from torch import nn

REPO_ID = "VOICEVOX/kanalizer-model"
MODEL_FILE = "model/c2k.safetensors"
MODEL_REVISION = "v5"
DICTIONARY_REPO_ID = "VOICEVOX/kanalizer-dataset"
DICTIONARY_FILE = "dataset/dataset.jsonl"
DICTIONARY_REVISION = "9920e8f5503e17a8b0647e0265e47923255df5dd"
SOS_IDX = 0
EOS_IDX = 1

# Order must match VOICEVOX/kanalizer/train/src/constants.py.
INPUT_TOKENS = ("<sos>", "<eos>", *ascii_lowercase)
OUTPUT_TOKENS = ("<sos>", "<eos>", *"ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヲンヴー")


def load_dictionary() -> dict[str, str]:
    """Load the pinned dataset, choosing the first reading for each word."""
    path = hf_hub_download(
        repo_id=DICTIONARY_REPO_ID,
        repo_type="dataset",
        filename=DICTIONARY_FILE,
        revision=DICTIONARY_REVISION,
    )
    with open(path, encoding="utf-8") as source:
        entries = (json.loads(line) for line in source if line.strip())
        return {entry["word"].lower(): entry["kata"][0] for entry in entries}


def _normalize(text: str) -> str:
    """Lowercase first, then drop every character outside ASCII a-z."""
    return "".join(ch for ch in text.lower() if "a" <= ch <= "z")


class _Seq2Seq(nn.Module):
    """Weight-key-compatible inference model for Kanalizer v5."""

    def __init__(self, dim: int):
        super().__init__()
        self.e_emb = nn.Embedding(len(INPUT_TOKENS), dim)
        self.k_emb = nn.Embedding(len(OUTPUT_TOKENS), dim)
        self.encoder = nn.GRU(dim, dim, batch_first=True, bidirectional=True)
        self.encoder_norm = nn.LayerNorm(2 * dim)
        self.encoder_fc = nn.Sequential(nn.Linear(2 * dim, dim), nn.Tanh())
        self.pre_decoder = nn.GRU(dim, dim, batch_first=True)
        self.pre_dec_norm = nn.LayerNorm(dim)
        self.attn = nn.MultiheadAttention(dim, num_heads=4, batch_first=True, dropout=0.1)
        self.attn_norm = nn.LayerNorm(dim)
        self.post_decoder = nn.GRU(2 * dim, dim, batch_first=True)
        self.post_dec_norm = nn.LayerNorm(dim)
        self.fc = nn.Linear(dim, len(OUTPUT_TOKENS))

    @torch.inference_mode()
    def decode(self, src: torch.Tensor, max_length: int) -> list[int]:
        """Unbatched greedy autoregressive decoding; src has shape [1, T]."""
        memory, _ = self.encoder(self.e_emb(src))
        memory = self.encoder_fc(self.encoder_norm(memory))
        token = torch.tensor([[SOS_IDX]], dtype=torch.long, device=src.device)
        h1 = h2 = None
        output: list[int] = []

        for step in range(max_length):
            dec, h1 = self.pre_decoder(self.k_emb(token), h1)
            dec = self.pre_dec_norm(dec)
            attn, _ = self.attn(dec, memory, memory, need_weights=False)
            attn = self.attn_norm(attn)
            dec, h2 = self.post_decoder(torch.cat((dec, attn), dim=-1), h2)
            logits = self.fc(self.post_dec_norm(dec))[0, 0]

            # Kanalizer disallows EOS only on the first output step.
            if step == 0:
                logits[EOS_IDX] = -torch.inf

            idx = int(logits.argmax().item())
            if idx == EOS_IDX:
                break
            output.append(idx)
            token.fill_(idx)

        return output


class Kanalizer:
    """English characters to Katakana using VOICEVOX's Kanalizer v5 weights.

    The model is downloaded once to huggingface_hub's cache if necessary.
    Instantiate this class once and reuse it for multiple words.
    """

    def __init__(
        self,
        *,
        device: str | torch.device = "cpu",
        revision: str = MODEL_REVISION,
    ) -> None:
        model_path = hf_hub_download(
            repo_id=REPO_ID,
            filename=MODEL_FILE,
            revision=revision,
        )
        weights = load_file(model_path, device="cpu")
        dim = weights["e_emb.weight"].shape[1]
        self.device = torch.device(device)
        self.model = _Seq2Seq(dim)
        # Full strict load: detect missing or incompatible Kanalizer weights.
        self.model.load_state_dict(weights, strict=True)
        self.model = self.model.to(self.device).eval()

    @torch.inference_mode()
    def __call__(self, text: str, *, max_length: int | None = None) -> str:
        if max_length is not None and max_length < 1:
            raise ValueError("max_length must be >= 1")

        cleaned = _normalize(text)
        if not cleaned:
            return ""

        # Match the Kanalizer Rust API's automatic output length.
        steps = len(cleaned) + 2 if max_length is None else max_length
        ids = [SOS_IDX, *(ord(c) - ord("a") + 2 for c in cleaned), EOS_IDX]
        src = torch.tensor([ids], dtype=torch.long, device=self.device)
        return "".join(OUTPUT_TOKENS[i] for i in self.model.decode(src, steps))
