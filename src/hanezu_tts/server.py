"""FastAPI server: ``POST/GET /inference`` (WAV) and the web UI at ``/`` and ``/index.html``."""

from __future__ import annotations

import threading
from importlib.resources import files

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import HTMLResponse, Response
from pydantic import BaseModel, Field

from . import __version__
from .audio import wav_bytes
from .model import MAX_SPEED, MIN_SPEED, HanezuTTS

MAX_TEXT_CHARS = 2000


class InferenceRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=MAX_TEXT_CHARS)
    speed: float = Field(1.0, ge=MIN_SPEED, le=MAX_SPEED, description="speaking-rate alpha")


def create_app(tts: HanezuTTS) -> FastAPI:
    app = FastAPI(title="朱華TTS (hanezu-tts)", version=__version__)
    lock = threading.Lock()
    page = files("hanezu_tts").joinpath("web/index.html").read_text("utf-8")

    def run(text: str, speed: float) -> Response:
        if not text.strip():
            raise HTTPException(422, "text must not be empty")
        try:
            with lock:
                waveform = tts.synthesize(text, speed=speed)
        except ValueError as exc:
            raise HTTPException(422, str(exc)) from exc
        return Response(
            wav_bytes(waveform, tts.sample_rate),
            media_type="audio/wav",
            headers={"X-Audio-Seconds": f"{len(waveform) / tts.sample_rate:.3f}"},
        )

    @app.post("/inference", response_class=Response, responses={200: {"content": {"audio/wav": {}}}})
    def inference(request: InferenceRequest) -> Response:
        return run(request.text, request.speed)

    @app.get("/inference", response_class=Response, responses={200: {"content": {"audio/wav": {}}}})
    def inference_get(
        text: str = Query(..., min_length=1, max_length=MAX_TEXT_CHARS),
        speed: float = Query(1.0, ge=MIN_SPEED, le=MAX_SPEED),
    ) -> Response:
        return run(text, speed)

    @app.get("/", response_class=HTMLResponse, include_in_schema=False)
    @app.get("/index.html", response_class=HTMLResponse, include_in_schema=False)
    def index() -> HTMLResponse:
        return HTMLResponse(page)

    @app.get("/health")
    def health() -> dict:
        return {
            "status": "ok",
            "version": __version__,
            "device": str(tts.device),
            "sample_rate": tts.sample_rate,
            "speed_range": [MIN_SPEED, MAX_SPEED],
        }

    return app
