"""Command line interface: ``hanezu-tts synth|serve|download``."""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

from .model import DEFAULT_REPO, DEVICES, MAX_SPEED, MIN_SPEED


def _common(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--model-dir", type=Path, default=None, help="model directory (default: ./models of the hanezu-tts checkout, or $HANEZU_TTS_MODEL_DIR)")
    parser.add_argument("--repo", default=None, help=f"Hugging Face repo for missing model files (default: {DEFAULT_REPO})")
    parser.add_argument("--device", choices=DEVICES, default="auto", help="inference device (default: auto = cuda if available, else cpu; mps must be chosen explicitly)")


def _speed(value: str) -> float:
    speed = float(value)
    if not MIN_SPEED <= speed <= MAX_SPEED:
        raise argparse.ArgumentTypeError(f"speed must be within [{MIN_SPEED}, {MAX_SPEED}]")
    return speed


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="hanezu-tts", description="朱華TTS (hanezu-tts) inference")
    sub = parser.add_subparsers(dest="command", required=True)

    synth = sub.add_parser("synth", help="synthesize text to a WAV file")
    synth.add_argument("text", nargs="?", help="text to speak ('-' or omitted: read stdin)")
    synth.add_argument("-o", "--output", type=Path, default=Path("output.wav"))
    synth.add_argument("-s", "--speed", type=_speed, default=1.0, help="speaking-rate alpha: 2.0 = twice as fast, 0.5 = half (default 1.0)")
    _common(synth)

    serve = sub.add_parser("serve", help="run the FastAPI server with /inference and the web UI")
    serve.add_argument("--host", default="127.0.0.1")
    serve.add_argument("--port", type=int, default=8000)
    _common(serve)

    download = sub.add_parser("download", help="download missing model files")
    download.add_argument("--model-dir", type=Path, default=None)
    download.add_argument("--repo", default=None)

    args = parser.parse_args(argv)
    try:
        _run(args)
    except (RuntimeError, ValueError, FileNotFoundError) as exc:
        print(f"hanezu-tts: error: {exc}", file=sys.stderr)
        raise SystemExit(1) from None


def _run(args: argparse.Namespace) -> None:
    if args.command == "download":
        from .model import ensure_model_files

        print(ensure_model_files(args.model_dir, args.repo))
        return

    from .model import HanezuTTS

    tts = HanezuTTS.load(args.model_dir, device=args.device, repo_id=args.repo)
    if args.command == "serve":
        import uvicorn

        from .server import create_app

        print(f"朱華TTS on {tts.device}: http://{args.host}:{args.port}/", file=sys.stderr)
        uvicorn.run(create_app(tts), host=args.host, port=args.port)
        return

    text = args.text if args.text not in (None, "-") else sys.stdin.read()
    import soundfile as sf

    start = time.perf_counter()
    waveform = tts.synthesize(text, speed=args.speed)
    elapsed = time.perf_counter() - start
    sf.write(args.output, waveform.clip(-1.0, 1.0), tts.sample_rate, subtype="PCM_16")
    seconds = len(waveform) / tts.sample_rate
    print(f"{args.output}: {seconds:.2f}s audio in {elapsed:.2f}s on {tts.device} (RTF {elapsed / max(seconds, 1e-9):.3f})", file=sys.stderr)


if __name__ == "__main__":
    main()
