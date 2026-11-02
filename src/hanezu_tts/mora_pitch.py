"""R30-only height and C1 observable mora-curvature inference."""

from __future__ import annotations

import numpy as np
import torch
from torch import nn

from .layers import Additive, AffineNorm, ConvBlock, gelu, phrase_positions


class Encoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.embedding = nn.Embedding(50, 8)
        self.phone_input = nn.Linear(53, 24)
        self.word_input = nn.Linear(392, 24)
        self.word_blocks = nn.ModuleList([Additive(24), Additive(24)])
        self.word_norm = AffineNorm(24, 1e-6)
        self.phone_blocks = nn.ModuleList([ConvBlock(24, 48, 5, d) for d in (1, 3)])
        self.phone_global = Additive(24)
        self.norm = AffineNorm(24, 1e-6)
        self.global_context = nn.Linear(48, 28)

    def forward(self, bank, numeric):
        wm = bank["word_mask"]
        wa = bank["word_assignment"]
        pooled = wa @ numeric[:, :8] / wa.sum(-1, keepdim=True).clamp_min(1)
        wh = (
            gelu(self.word_input(torch.cat([bank["words"], pooled], -1)))
            + phrase_positions(pooled[:, 1])
        ) * wm[:, None]
        for block in self.word_blocks:
            wh = block(wh, wm)
        wh = self.word_norm(wh) * wm[:, None]
        emb = self.embedding(bank["categories"]).reshape(len(numeric), 40)
        h = gelu(self.phone_input(torch.cat([numeric, emb], -1))) + phrase_positions(numeric[:, 1])
        h = h + wh[bank["word_ids"]]
        for block in self.phone_blocks:
            h = block(h)
        h = self.phone_global(h, torch.ones(len(h), device=h.device, dtype=torch.bool))
        ga = bank["group_assignment"]
        h = self.norm(ga @ h / ga.sum(-1, keepdim=True).clamp_min(1))
        count = len(h)
        position = 2 * torch.arange(count, device=h.device) / max(count - 1, 1) - 1
        context = self.global_context(
            torch.cat([h.sum(0) / count, (h * position[:, None]).sum(0) / count])
        )
        return torch.cat([h, context.expand(count, 28)], -1)


class Height(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = Encoder()
        self.output = nn.Linear(52, 2)
        self.register = nn.Linear(28, 2)

    def forward(self, bank):
        features = self.encoder(bank, bank["numeric"])
        physical = self.register(features[0, 24:])
        proposals = self.output(features)
        left, right = proposals[:, 0], proposals[:, 1]
        boundaries = torch.cat([left[:1], 0.5 * (right[:-1] + left[1:]), right[-1:]])
        fg, u = bank["frame_groups"], bank["u"]
        raw = (1 - u) * boundaries[fg] + u * boundaries[fg + 1]
        speech = bank["speech"]
        den = speech.sum().clamp_min(1)
        raw = raw - (raw * speech).sum() / den
        variance = (raw.square() * speech).sum() / den
        normalized = raw * torch.rsqrt(variance.clamp_min(1e-8)).clamp_max(100)
        return (
            5.433708667755127
            + 0.19792799651622772 * physical[0]
            + 0.19792799651622772 * physical[1].clamp(-4, 4).exp() * normalized
        )


class Shape(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = Encoder()
        self.inner = nn.Linear(52, 24)
        self.output = nn.Linear(24, 1)
        self.vowel_duration = nn.Parameter(torch.empty(15, 11))
        self.vowel_offset = nn.Parameter(torch.empty(15))
        self.accent_event_weight = nn.Parameter(torch.empty(5, 22))
        for name, shape in [
            ("duration_mean", (15,)),
            ("duration_scale", (15,)),
            ("accent_mean", (15, 5)),
            ("accent_scale", (15, 5)),
            ("context_probability", (15,)),
            ("event_mean", (5, 22)),
        ]:
            self.register_buffer(name, torch.empty(shape))

    def forward(self, bank):
        numeric = bank["numeric"].clone()
        numeric[:, 8] = torch.log1p(bank["durations"]) / 3
        neural = self.output(gelu(self.inner(self.encoder(bank, numeric))))[:, 0]
        kind = bank["vowel_class"]
        valid = bank["vowel_valid"]
        x = (
            (torch.log1p(bank["vowel_length"]) - self.duration_mean[kind])
            / self.duration_scale[kind]
        ).clamp(-3, 3)
        z = ((bank["vowel_linguistic"] - self.accent_mean[kind]) / self.accent_scale[kind]).clamp(
            -3, 3
        )
        direct = (self.vowel_duration[kind] * torch.cat([x[:, None], z, x[:, None] * z], -1)).sum(
            -1
        )
        offset = self.vowel_offset[kind] - (self.context_probability * self.vowel_offset).sum()
        f = bank["vowel_linguistic"]
        phase = (f[:, 0] * 20).round().to(torch.long).add(3).clamp(0, 6)
        e = torch.nn.functional.one_hot(phase, 7).to(f.dtype)
        fw, bw, nucleus = (f[:, 1] * 30).round(), (f[:, 2] * 30).round(), (f[:, 4] * 30).round()
        e = torch.cat(
            [e, torch.stack([fw == 1, bw == 1, bw == 2, nucleus == 0], -1).to(f.dtype)], -1
        )
        e = torch.cat([e, x[:, None] * e], -1) - self.event_mean[kind // 3]
        event = (self.accent_event_weight[kind // 3] * e).sum(-1)
        k = neural + (direct + offset + event) * valid
        return 0.19792799651622772 * k[bank["frame_groups"]] * bank["basis"]


class R30Pitch(nn.Module):
    def __init__(self):
        super().__init__()
        self.height = Height()
        self.shape = Shape()
        self.register_buffer("word_mean", torch.empty(384))
        self.register_buffer("word_scale", torch.empty(384))

    def forward(self, ids, features, wids, word_features, durations, geometry):
        device = ids.device
        as_tensor = lambda x, dtype=torch.float32: torch.as_tensor(x, dtype=dtype, device=device)
        pid = ids.cpu().numpy()
        d = np.asarray(durations, np.float32)
        P = len(pid)
        W = len(word_features)
        G = geometry.units
        counts = np.bincount(wids, minlength=W)
        first = np.full(W, P)
        np.minimum.at(first, wids, np.arange(P))
        own = counts[wids]
        within = np.where(wids > 0, (np.arange(P) - first[wids]) / np.maximum(own - 1, 1), 0)
        extra = np.stack(
            [
                np.zeros(P),
                np.arange(P) / max(P - 1, 1),
                wids / max(int(wids.max()), 1),
                within,
                np.log1p(own) / 3,
            ],
            -1,
        ).astype(np.float32)
        numeric = torch.cat([features, as_tensor(extra)], -1)
        cats = np.stack(
            [
                np.where(
                    (np.arange(P) + o >= 0) & (np.arange(P) + o < P),
                    pid[np.clip(np.arange(P) + o, 0, P - 1)],
                    49,
                )
                for o in (-2, -1, 0, 1, 2)
            ],
            -1,
        )
        wi = as_tensor(wids, torch.long)
        words = (as_tensor(word_features) - self.word_mean) / self.word_scale
        words[0] = 0
        ga = np.arange(G)[:, None] == geometry.groups[None, :]
        last = np.zeros(G, np.int64)
        np.maximum.at(last, geometry.groups, np.arange(P))
        terminal = pid[last]
        vowel = (pid >= 3) & (pid <= 12)
        length = (ga * d * vowel).sum(-1).astype(np.float32)
        valid = (terminal >= 3) & (terminal <= 12)
        previous = pid[np.maximum(last - 1, 0)]
        context = np.where(
            ga.sum(-1) > 1, 0, np.where((last > 0) & (previous >= 3) & (previous <= 12), 1, 2)
        )
        kind = ((terminal - 3) % 5) * 3 + context
        fg = geometry.frame_groups
        u = ((geometry.knot_index % 2).astype(np.float32) + geometry.knot_alpha) / 2
        mora_length = (ga * d).sum(-1).astype(np.float32)
        a = (mora_length - length) / np.maximum(mora_length - 1, 1)
        p = np.where(valid & (length >= 3), (1 + a) / 2, 0.5)
        ap = p[fg]
        phi = 1 - ((u - ap) / np.maximum(np.where(u <= ap, ap, 1 - ap), 1e-6)) ** 2
        start = 1 - ((a[fg] - ap) / np.maximum(ap, 1e-6)) ** 2
        progress = (u - a[fg]) / np.maximum(1 - a[fg], 1e-6)
        residual = np.maximum(phi - (1 - progress) * start, 0) * vowel[geometry.phone_index]
        peak = np.zeros(G, np.float32)
        np.maximum.at(peak, fg, residual)
        scale = np.where(valid & (length >= 3), 1 / np.maximum(peak, 1e-6), 1)
        bank = {
            "numeric": numeric,
            "words": words,
            "word_mask": as_tensor(counts > 0, torch.bool),
            "word_assignment": (wi[None, :] == torch.arange(W, device=device)[:, None]).to(
                features.dtype
            ),
            "word_ids": wi,
            "categories": as_tensor(cats, torch.long),
            "group_assignment": as_tensor(ga),
            "frame_groups": as_tensor(fg, torch.long),
            "u": as_tensor(u),
            "basis": as_tensor(phi * scale[fg]),
            "speech": as_tensor((pid[geometry.phone_index] > 2) & (pid[geometry.phone_index] < 48)),
            "durations": as_tensor(d),
            "vowel_class": as_tensor(kind, torch.long),
            "vowel_valid": as_tensor(valid),
            "vowel_length": as_tensor(length),
            "vowel_linguistic": features[as_tensor(last, torch.long), :5],
        }
        return (self.height(bank) + self.shape(bank) - 5.433708667755127) / 0.19792799651622772
