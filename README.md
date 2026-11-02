# 朱華TTS (hanezu-tts)

![Hanezu TTS](hanezu_tts_logo.svg)

1.7Mパラメーターの軽量日本語TTSです。  
詳細はモデルカードを参照してください。

Demo: https://kaeru-shigure.github.io/hanezu-tts/

Pretrained Model: https://huggingface.co/kaeru-shigure/hanezu-tts

Python版・ブラウザ版ともに、上記リポジトリの `main` ブランチ直下にある
`weight.safetensors` と `config.json` を使用します。
Python版はローカルにないモデルファイルを自動でダウンロードします。

## Setup

```bash
cd hanezu-tts
uv venv --python 3.12 .venv
source .venv/bin/activate
uv pip install -e .
```

## Usage

```bash
hanezu-tts synth "こんにちは。今日はいい天気ですね？" -o out.wav
hanezu-tts synth "速く話します。" --speed 1.5 --device cpu
echo "標準入力も使えます。" | hanezu-tts synth -o out.wav
hanezu-tts download
hanezu-tts serve --host 127.0.0.1 --port 8000 --device auto
```

- `GET /` または `GET /index.html`：テキスト入力、話速スライダー、再生・ダウンロード機能を備えたWeb UIを表示します。
- `POST /inference`：JSON `{"text": "...", "speed": 1.0}` を送信すると、`audio/wav`（16ビットPCM）を返します。
- `GET /inference?text=...&speed=1.0`：POSTと同じ処理を行います。
- `GET /health`：使用デバイスとサンプリングレートを返します。

```bash
curl -X POST localhost:8000/inference -H 'Content-Type: application/json' \
     -d '{"text": "こんにちは", "speed": 1.2}' -o out.wav
```

## Python

```python
from hanezu_tts.model import HanezuTTS

tts = HanezuTTS.load(device="auto")
audio = tts.synthesize("こんにちは。", speed=1.0)  # float32のNumPy配列、tts.sample_rate Hz
```

## LICENSE

MIT License
