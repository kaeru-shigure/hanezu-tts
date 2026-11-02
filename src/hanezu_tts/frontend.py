"""Japanese frontend: pyopenjtalk-plus phones/context + TSqyomi word semantics.

The phone inventory, feature order and engine pins come from the model's
``config.json`` contract and are checked against the installed engine.
"""

from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from threading import RLock

import numpy as np
from e2k import NGram

from .kanalizer import Kanalizer, load_dictionary

MAX_OPENJTALK_TEXT_CHARS = 256
HIDDEN_OUTPUT = "/backbone/final_norm/LayerNormalization_output_0"
TSQYOMI_REPO = "tsukumijima/tsqyomi-models"
BOUNDARY_PATTERN = re.compile(r"[!?！？。]+(?:[」』\"'）)\]】]*[!?！？。]+)*[」』\"'）)\]】]*")
ENGLISH_PATTERN = re.compile(r"[A-Z]+(?=[A-Z][a-z]|[^A-Za-z]|$)|[A-Z]?[a-z]+")
VOWELS = frozenset(("a", "i", "u", "e", "o", "A", "I", "U", "E", "O", "N", "cl"))
DEVOICED = frozenset(("A", "I", "U", "E", "O"))
PAUSES = frozenset(("sil", "pau", "?"))
_LOCK = RLock()


@dataclass(frozen=True)
class FrontendOutput:
    phone_ids: np.ndarray  # [P] int
    features: np.ndarray  # [P, 8] float32
    phone_word_ids: np.ndarray  # [P] int, 0 = no word
    word_features: np.ndarray  # [W, 384] float32, row 0 = unknown
    words: tuple[dict, ...]


@lru_cache(maxsize=1)
def _get_english_dictionary() -> dict[str, str]:
    return load_dictionary()


@lru_cache(maxsize=1)
def _get_ngram() -> NGram:
    return NGram()


@lru_cache(maxsize=1)
def _get_kanalizer() -> Kanalizer:
    return Kanalizer()


def _english_reading(match: re.Match[str]) -> str:
    word = match.group()
    if word.isupper():
        return word
    reading = _get_english_dictionary().get(word.lower())
    if reading is not None:
        return reading
    return _get_kanalizer()(word) if _get_ngram()(word) else word


def normalize_text(text: str, *, preserve_newlines: bool = False) -> str:
    """Normalize input and transliterate word-like English before chunking."""
    whitespace = r"[^\S\n]+" if preserve_newlines else r"\s+"
    text = re.sub(whitespace, " ", unicodedata.normalize("NFKC", text)).strip()
    with _LOCK:
        return ENGLISH_PATTERN.sub(_english_reading, text)


def canonical_boundaries(text: str) -> tuple[str, frozenset[int]]:
    """Collapse sentence punctuation to 。 and remember question positions."""
    pieces, questions, cursor, size = [], set(), 0, 0
    for match in BOUNDARY_PATTERN.finditer(text):
        prefix = text[cursor : match.start()]
        pieces.extend((prefix, "。"))
        size += len(prefix)
        if "?" in match.group() or "？" in match.group():
            questions.add(size)
        size += 1
        cursor = match.end()
    pieces.append(text[cursor:])
    return "".join(pieces), frozenset(questions)


def split_sentences(text: str, limit: int = MAX_OPENJTALK_TEXT_CHARS) -> list[str]:
    """Split at punctuation/brackets/newlines, retaining delimiters in <= limit chunks."""
    text = normalize_text(text, preserve_newlines=True)
    parts = re.split(r"([、。！？!?\n「」『』()]+)", text)
    chunks: list[str] = []
    for index in range(0, len(parts), 2):
        if not parts[index].strip():
            continue
        part = re.sub(r"\s+", " ", "".join(parts[index : index + 2])).strip()
        while len(part) > limit:
            cut = max(part.rfind(c, 0, limit) for c in "、,，")
            cut = cut + 1 if cut > 0 else limit
            chunks.append(part[:cut])
            part = part[cut:]
        if part.strip():
            chunks.append(part)
    return [c.strip() for c in chunks if c.strip()]


def context_features(label: str, phone: str) -> list[float]:
    accent = re.search(r"/A:(-?\d+)\+(\d+)\+(\d+)", label)
    phrase = re.search(r"/F:(\d+)_(\d+)", label)
    relative, forward, backward = map(int, accent.groups()) if accent else (0, 0, 0)
    moras, nucleus = map(int, phrase.groups()) if phrase else (0, 0)
    return [
        max(-20, min(relative, 20)) / 20,
        min(forward, 30) / 30,
        min(backward, 30) / 30,
        min(moras, 30) / 30,
        min(nucleus, 30) / 30,
        float(phone in DEVOICED),
        float(phone in VOWELS),
        float(phone in PAUSES),
    ]


def _phone(label: str) -> str:
    match = re.search(r"-([^+]+)\+", label)
    if match is None:
        raise ValueError(f"Cannot parse OpenJTalk label: {label}")
    return match.group(1)


def emitted_word_phones(words):
    """OpenJTalk collapses adjacent punctuation into one pause."""
    emitted = []
    for index, word in enumerate(words):
        phones = word["phonemes"]
        if not phones and word.get("pron") == "、":
            phones = ["pau"]
        if word.get("is_ignored", False) and not phones:
            continue
        for phone in phones:
            if phone == "sp":
                continue
            if phone == "pau" and emitted and emitted[-1][0] == "pau":
                continue
            emitted.append((phone, index + 1))
    while emitted and emitted[0][0] == "pau":
        emitted.pop(0)
    while emitted and emitted[-1][0] == "pau":
        emitted.pop()
    return emitted


class _ContextSession:
    """Share one ONNX session between reading selection and semantic features."""

    def __init__(self, session):
        self.session = session
        self.hidden: dict = {}

    def __getattr__(self, name):
        return getattr(self.session, name)

    def clear(self):
        self.hidden.clear()

    def run(self, outputs, inputs, *args, **kwargs):
        requested = list(outputs) if outputs else [v.name for v in self.session.get_outputs()]
        key = (inputs["input_ids"].tobytes(), inputs["attention_mask"].tobytes())
        if requested == [HIDDEN_OUTPUT] and key in self.hidden:
            return [self.hidden[key]]
        names = list(dict.fromkeys([*requested, HIDDEN_OUTPUT]))
        values = dict(zip(names, self.session.run(names, inputs, *args, **kwargs), strict=True))
        self.hidden[key] = values[HIDDEN_OUTPUT]
        return [values[name] for name in requested]


class JapaneseFrontend:
    def __init__(self, contract: dict):
        self.contract = contract
        self.phones = list(contract["phones"])
        self.phone_to_id = {p: i for i, p in enumerate(self.phones)}
        self.width = int(contract["word_context_width"])
        self._model = None
        self._pyopenjtalk = None

    # -- engine -------------------------------------------------------------------

    def _load(self):
        if self._model is not None:
            return
        try:
            import onnx
            import onnxruntime as ort
            import pyopenjtalk
            from huggingface_hub import hf_hub_download
            from pyopenjtalk import tsqyomi
        except ImportError as exc:  # pragma: no cover
            raise RuntimeError("hanezu-tts needs pyopenjtalk-plus[tsqyomi], onnx and onnxruntime") from exc
        c = self.contract
        if not c.get("use_tsqyomi", False) or c.get("run_marine", False):
            raise ValueError("frontend contract requires TSqyomi without marine")
        version, revision = c["tsqyomi_version"], c["tsqyomi_revision"]
        paths = {
            name: Path(hf_hub_download(TSQYOMI_REPO, f"{version}/{name}", revision=revision))
            for name in ("model.onnx", "tokenizer.json", "metadata.json")
        }
        tsqyomi.load_model(model_dir=paths["model.onnx"].parent)
        model = tsqyomi.get_loaded_model()
        expected = json.loads(paths["metadata.json"].read_bytes())
        if (
            model.metadata.class_index_by_surface_and_pronunciation
            != expected["class_index_by_surface_and_pronunciation"]
        ):
            raise RuntimeError("An incompatible TSqyomi reading model is already loaded")
        graph = onnx.load(str(paths["model.onnx"]))
        graph.graph.output.append(
            onnx.helper.make_tensor_value_info(HIDDEN_OUTPUT, onnx.TensorProto.FLOAT16, [None, None, self.width])
        )
        options = ort.SessionOptions()
        options.intra_op_num_threads = options.inter_op_num_threads = 1
        model.session = _ContextSession(
            ort.InferenceSession(graph.SerializeToString(), sess_options=options, providers=["CPUExecutionProvider"])
        )
        self._model = model
        self._pyopenjtalk = pyopenjtalk

    def _word_context(self, words, phones):
        tokenizer = self._model.tokenizer
        ids, spans = [], []
        for word in words:
            pieces = tokenizer.encode(word["surface"], add_special_tokens=False).ids
            spans.append(list(range(len(ids) + 1, len(ids) + 1 + len(pieces))))
            ids.extend(pieces)
        emitted = emitted_word_phones(words)
        phone_words = np.zeros(len(phones), np.int64)
        if ["sil", *[p for p, _ in emitted], "sil"] != list(phones):
            return phone_words, np.zeros((1, self.width), np.float32)
        phone_words[1:-1] = [index for _, index in emitted]
        boundary = tokenizer.encode("").ids
        ids = [boundary[0], *ids, boundary[1]]
        if len(ids) > 512:
            raise ValueError("semantic context exceeds the 512-token window")
        inputs = {
            "input_ids": np.asarray([ids], np.int64),
            "attention_mask": np.ones((1, len(ids)), np.int64),
            "target_mask": np.ones((1, 1, len(ids)), np.bool_),
        }
        hidden = self._model.session.run([HIDDEN_OUTPUT], inputs)[0][0].astype(np.float32)
        states = np.stack(
            [hidden[span].mean(axis=0) if span else np.zeros(self.width, np.float32) for span in spans]
        )
        states = states.astype(np.float16).astype(np.float32)  # contract storage precision
        count = int(phone_words.max())
        return phone_words, np.concatenate([np.zeros((1, self.width), np.float32), states[:count]], axis=0)

    @staticmethod
    def _boundary_phones(words, phones):
        emitted = emitted_word_phones(words)
        internal = [
            (index + 1, words[word - 1]["char_span"][0])
            for index, (phone, word) in enumerate(emitted)
            if phone == "pau" and "。" in words[word - 1]["surface"]
        ]
        if internal and ["sil", *[p for p, _ in emitted], "sil"] != phones:
            raise ValueError("Cannot align sentence punctuation to OpenJTalk phones")
        end = max((w["char_span"][0] for w in words if "。" in w["surface"]), default=-1)
        if words and emitted:
            last_word = emitted[-1][1] - 1
            end = next((w["char_span"][0] for w in words[last_word + 1 :] if "。" in w["surface"]), -1)
        return [*internal, (len(phones) - 1, end)]

    # -- public -------------------------------------------------------------------

    def encode(self, text: str, *, preprocessed: bool = False) -> FrontendOutput:
        """Encode a chunk, reusing preprocessing already done by split_sentences."""
        normalized = text if preprocessed else normalize_text(text)
        if not normalized:
            raise ValueError("empty text")
        if len(normalized) > MAX_OPENJTALK_TEXT_CHARS:
            raise ValueError(f"text chunk too long ({len(normalized)} > {MAX_OPENJTALK_TEXT_CHARS})")
        canonical, questions = canonical_boundaries(normalized)
        with _LOCK:
            self._load()
            jtalk = self._pyopenjtalk
            self._model.session.clear()
            njd, morphs = jtalk.run_frontend_detailed(canonical, use_tsqyomi=True, run_marine=False)
            labels = list(jtalk.make_label(njd))
            words = jtalk.make_phoneme_mapping(njd, morphs=morphs, caller_text=canonical)
            phones = [_phone(label) for label in labels]
            phone_words, states = self._word_context(words, phones)
            boundaries = self._boundary_phones(words, phones)
            self._model.session.clear()
        if not phones:
            raise ValueError("OpenJTalk returned no phones")
        invalid = [p for p in phones if p not in self.phone_to_id or p == "<pad>"]
        if invalid:
            raise ValueError(f"unknown phones: {invalid}")
        phone_ids = np.asarray([self.phone_to_id[p] for p in phones], np.int64)
        for index, position in boundaries:
            if phones[index] not in ("sil", "pau"):
                raise ValueError("sentence boundary must replace an OpenJTalk pause")
            phone_ids[index] = self.phone_to_id["?" if position in questions else "sil"]
            phone_words[index] = 0
        features = np.asarray([context_features(l, p) for l, p in zip(labels, phones)], np.float32)
        morphology = tuple({k: w[k] for k in ("pos", "pos_group1", "is_unknown")} for w in words)
        return FrontendOutput(phone_ids, features, phone_words, states, morphology)
