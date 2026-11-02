"""Deterministic linguistic global-cost duration tree (NumPy only).

Tree arrays live in ``weight.safetensors`` under ``table.duration.*`` (the
float64 thresholds are kept exactly); the POS vocabularies, bounds and hash
width are plain values in ``config.json``.
"""

from __future__ import annotations

import numpy as np

INPUT_WIDTH = 369
_FNV_BASIS = 2166136261
_FNV_PRIME = 16777619
_MASK32 = 4294967295
_RAW_SCALE = np.array([20, 30, 30, 30, 30, 1, 1, 1], np.float32)


def _structural(ids: np.ndarray, wids: np.ndarray) -> np.ndarray:
    n = len(ids)
    speech = (ids > 2) & (ids < 48)
    group = np.zeros(n, np.int32)
    g = 0
    for i in range(n):
        group[i] = g
        pause = ids[i] in (1, 2, 48)
        terminal = 3 <= ids[i] <= 14
        next_pause = i + 1 < n and ids[i + 1] in (1, 2, 48)
        if pause or terminal or next_pause or i == n - 1:
            g += 1
    starts = np.array(
        [int(speech[i] and (i == 0 or not speech[i - 1] or group[i] != group[i - 1])) for i in range(n)]
    )
    cumulative = np.cumsum(starts)
    total = int(starts.sum())
    x = np.zeros((n, 12), np.float32)
    x[:, 6] = cumulative
    x[:, 7] = total - cumulative + speech
    x[:, 8] = total
    for is_word, cols in ((True, [0, 1, 2]), (False, [3, 4, 5])):
        i = 0
        while i < n:
            if not speech[i] or (is_word and wids[i] <= 0):
                i += 1
                continue
            j = i + 1
            while j < n and speech[j] and (not is_word or wids[j] == wids[i]):
                j += 1
            groups = list(dict.fromkeys(group[i:j].tolist()))
            rank = {v: k + 1 for k, v in enumerate(groups)}
            m = len(groups)
            for k in range(i, j):
                f = rank[int(group[k])]
                x[k, cols] = (f, m - f + 1, m)
            if is_word:
                x[i:j, 9] = 1
                x[i, 10] = 1
                x[j - 1, 11] = 1
            i = j
    return x


class DurationTree:
    def __init__(self, tables: dict[str, np.ndarray], config: dict):
        self.feature = tables["feature"].astype(np.int32)
        self.threshold = tables["threshold"].astype(np.float64)
        self.left = tables["left"].astype(np.int32)
        self.right = tables["right"].astype(np.int32)
        self.native_table = tables["native_table"]
        self.manner = tables["manner_lookup"].astype(np.int64)
        lo, hi = (int(v) for v in config["native_bounds"])
        self.native_high = hi
        if lo != 1:
            raise ValueError("duration native bounds must start at 1")
        self.hash_bits = int(config["hash_bits"])
        vocabulary = config["vocabulary"]
        self.pos = {v: i for i, v in enumerate(vocabulary["pos"])}
        self.pos_count = len(vocabulary["pos"])
        self.special = list(vocabulary["special"])
        self.fine = {v: i for i, v in enumerate(vocabulary["fine"])}
        self.fine_count = len(vocabulary["fine"])

    def features(self, ids, raw, wids, words) -> np.ndarray:
        ids = np.asarray(ids, np.int64)
        raw = np.asarray(raw, np.float32)
        wids = np.asarray(wids, np.int64)
        n = len(ids)
        padded = np.pad(ids, (2, 2))
        neighbors = [padded[2 + d : 2 + d + n] for d in (-2, -1, 0, 1, 2)]
        pieces = [(v[:, None] == np.arange(49)).astype(np.float32) for v in neighbors]
        pieces += [
            (self.manner[neighbors[j]][:, None] == np.arange(11)).astype(np.float32) for j in (1, 2, 3)
        ]
        pieces.append(np.rint(raw * _RAW_SCALE).astype(np.float32))
        pieces.append(_structural(ids, wids))
        morph = np.zeros((n, 4), np.int64)
        fine = np.zeros((n, self.fine_count), np.float32)
        for i, wid in enumerate(wids):
            if not 0 < int(wid) <= len(words):
                continue
            word = words[int(wid) - 1]
            morph[i] = [
                self.pos.get(word["pos"], 0),
                int(word["pos_group1"] == self.special[0]),
                int(word["pos_group1"] == self.special[1]),
                int(word["is_unknown"]),
            ]
            index = self.fine.get(word["pos_group1"])
            if index is not None:
                fine[i, index] = 1
        pieces.append((morph[:, 0, None] == np.arange(self.pos_count)).astype(np.float32))
        pieces.append(morph[:, 1:].astype(np.float32))
        pieces.append(fine)
        hashes = np.zeros(n, np.uint64)
        for wid in np.unique(wids[wids > 0]):
            positions = np.flatnonzero(wids == wid)
            value = _FNV_BASIS
            for phone in ids[positions]:
                value = ((value ^ int(phone)) * _FNV_PRIME) & _MASK32
            hashes[positions] = value
        shifts = np.arange(self.hash_bits, dtype=np.uint64)
        pieces.append(((hashes[:, None] >> shifts[None]) & 1).astype(np.float32))
        x = np.concatenate(pieces, axis=1).astype(np.float32)
        if x.shape[1] != INPUT_WIDTH:
            raise RuntimeError(f"duration features have {x.shape[1]} columns, expected {INPUT_WIDTH}")
        return x

    def predict(self, ids, raw, wids, words) -> np.ndarray:
        x = self.features(ids, raw, wids, words)
        phone = np.argmax(x[:, 98:147], axis=1)
        node = np.zeros(len(x), np.int64)
        active = node >= 0
        while active.any():
            rows = np.flatnonzero(active)
            current = node[rows]
            go_left = x[rows, self.feature[current]] <= self.threshold[current]
            node[rows] = np.where(go_left, self.left[current], self.right[current])
            active = node >= 0
        code = -node
        use = code > self.native_high
        code[use] = self.native_table[code[use] - self.native_high - 1, phone[use]]
        return code.astype(np.int64)
