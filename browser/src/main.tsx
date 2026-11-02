import { render } from "preact/compat";
import { useLayoutEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { IoPlaySharp } from "react-icons/io5";
import { RxArrowDown, RxArrowRight, RxPause, RxStop } from "react-icons/rx";
import { formatBytes } from "./runtime/assets";
import { ModelCard } from "./ui/ModelCard";
import * as s from "./ui/state";
import "./ui/style.css";

const tabs = [
  ["voice", "音声合成"],
  ["storage", "ストレージ"],
  ["model-card", "モデルカード"],
] as const;

function Editor() {
  const overlay = useRef<HTMLDivElement>(null);
  const pieces = [];
  let cursor = 0;
  s.chunks.value.forEach((chunk, index) => {
    pieces.push(s.input.value.slice(cursor, chunk.start));
    pieces.push(
      <span class={`chunk ${s.chunkStates.value[index] ?? ""}`}>
        {s.input.value.slice(chunk.start, chunk.end)}
      </span>,
    );
    cursor = chunk.end;
  });
  pieces.push(s.input.value.slice(cursor));
  return (
    <div class={`editor ${s.chunks.value.length ? "show-progress" : ""}`}>
      <div class="text-layer progress-layer" ref={overlay} aria-hidden="true">
        {pieces}
        {"\n"}
      </div>
      <textarea
        id="text"
        aria-label="読み上げる文章"
        class="text-layer"
        value={s.input.value}
        readOnly={s.busy.value}
        spellcheck={false}
        placeholder="ここに読み上げたい文章を入力してください。"
        onScroll={(event) => {
          if (overlay.current) {
            overlay.current.scrollTop = event.currentTarget.scrollTop;
            overlay.current.scrollLeft = event.currentTarget.scrollLeft;
          }
        }}
        onInput={(event) => {
          s.input.value = event.currentTarget.value;
          s.chunks.value = [];
          s.chunkStates.value = {};
        }}
      />
    </div>
  );
}
function ClipPlayer({ url }: { url: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const playing = useSignal(false),
    elapsed = useSignal(0),
    duration = useSignal(0),
    playbackError = useSignal("");
  useLayoutEffect(() => {
    const element = audio.current;
    if (!element) return;
    return () => {
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, []);
  const timestamp = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  return (
    <>
      <audio
        ref={audio}
        autoPlay
        preload="metadata"
        src={url}
        onLoadedMetadata={(event) =>
          (duration.value = event.currentTarget.duration)
        }
        onTimeUpdate={(event) =>
          (elapsed.value = event.currentTarget.currentTime)
        }
        onPlay={() => (playing.value = true)}
        onPause={() => (playing.value = false)}
        onEnded={() => (playing.value = false)}
      />
      <div class="player">
        <button
          aria-label={playing.value ? "一時停止" : "再生"}
          onClick={async () => {
            const element = audio.current;
            if (!element) return;
            if (playing.value) element.pause();
            else
              try {
                await element.play();
              } catch {
                if (audio.current === element)
                  playbackError.value =
                    "音声を再生できません。WAV を保存してお試しください。";
              }
          }}
        >
          {playing.value ? (
            <RxPause className="icon" aria-hidden="true" focusable="false" />
          ) : (
            <IoPlaySharp
              className="icon"
              size={16}
              aria-hidden="true"
              focusable="false"
            />
          )}
        </button>
        <input
          type="range"
          aria-label="再生位置"
          aria-valuetext={`${timestamp(elapsed.value)} / ${timestamp(duration.value)}`}
          min="0"
          max={duration.value || 1}
          step="0.01"
          value={elapsed.value}
          disabled={!duration.value}
          onInput={(event) => {
            if (audio.current)
              audio.current.currentTime = Number(event.currentTarget.value);
          }}
        />
        <span>
          {timestamp(elapsed.value)} / {timestamp(duration.value)}
        </span>
      </div>
      {playbackError.value && <p class="subtle">{playbackError}</p>}
    </>
  );
}
function Voice() {
  return (
    <section
      id="panel-voice"
      role="tabpanel"
      aria-labelledby="tab-voice"
      hidden={s.tab.value !== "voice"}
    >
      <div class="voice-grid">
        <div class="composition">
          <Editor />
          <div class="controls">
            <div class="speed">
              <label for="speed">
                話す速さ{" "}
                <output for="speed">
                  {s.speed.value.toFixed(2)}
                  <small> 倍</small>
                </output>
              </label>
              <input
                id="speed"
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={s.speed.value}
                disabled={s.busy.value}
                onInput={(event) =>
                  (s.speed.value = Number(event.currentTarget.value))
                }
              />
            </div>
            {s.busy.value ? (
              <button class="primary" onClick={s.cancelSynthesis}>
                合成を中止する
                <RxStop className="icon" aria-hidden="true" focusable="false" />
              </button>
            ) : (
              <button
                class="primary"
                disabled={
                  !s.ready.value || s.downloading.value || !s.input.value.trim()
                }
                onClick={s.synthesize}
              >
                合成する
                <RxArrowRight
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                />
              </button>
            )}
          </div>
          <div class="live-status" role="status" aria-live="polite">
            {s.status.value}
          </div>
          {!s.ready.value && (
            <p class="notice">
              読み上げに必要なデータを準備してください。
              <button
                class="text-button"
                onClick={() => (s.tab.value = "storage")}
              >
                ストレージを開く{" "}
                <RxArrowRight
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                />
              </button>
            </p>
          )}
        </div>
        <aside class="recordings" aria-label="音声一覧">
          {!s.clips.value.length ? (
            <div class="empty">
              <p>合成済みの音声はありません。</p>
            </div>
          ) : (
            <ol class="clips">
              {s.clips.value.map((clip) => (
                <li key={clip.id}>
                  <div class="clip-meta">
                    <span>
                      {clip.date} · {clip.seconds.toFixed(1)} 秒 ·{" "}
                      {clip.speed.toFixed(2)} 倍
                    </span>
                    <button
                      class="text-button"
                      aria-label={`${clip.text.slice(0, 20)} の音声を削除`}
                      onClick={() => s.removeClip(clip.id)}
                    >
                      削除
                    </button>
                  </div>
                  <p>{clip.text}</p>
                  <ClipPlayer url={clip.url} />
                  <a
                    class="download-link"
                    href={clip.url}
                    download={`hanezu-${clip.id}.wav`}
                  >
                    WAV を保存{" "}
                    <RxArrowDown
                      className="icon"
                      aria-hidden="true"
                      focusable="false"
                    />
                  </a>
                </li>
              ))}
            </ol>
          )}
          <p class="subtle session-note">
            音声はこのタブを閉じるまで保持されます。
          </p>
        </aside>
      </div>
    </section>
  );
}
const groupColors = ["#b96673", "#c78f7a", "#c7b0b2", "#929b87", "#bdb6a9"];
function Storage() {
  const assets = s.manifest.value?.assets ?? [];
  const groups = [...new Set(assets.map((a) => a.group))];
  const selected = s.download.value;
  const receivedByAsset = Object.fromEntries(
    assets.map((asset) => [
      asset.id,
      Math.max(
        s.stored.value[asset.id] ?? 0,
        asset.id === selected.id ? Math.min(selected.bytes, asset.bytes) : 0,
      ),
    ]),
  );
  const receivedBytes = Object.values(receivedByAsset).reduce(
    (n, bytes) => n + bytes,
    0,
  );
  const progressLabel = s.downloading.value ? "取得済み" : "保存済み";
  return (
    <section
      id="panel-storage"
      role="tabpanel"
      aria-labelledby="tab-storage"
      hidden={s.tab.value !== "storage"}
    >
      <div class="storage-intro">
        <div>
          <h2>データのダウンロード</h2>
          <p>推論に必要なデータをダウンロードします。</p>
        </div>
        <div class="storage-total">
          <strong>{formatBytes(receivedBytes)}</strong>
          <span>
            {progressLabel} / 全体 {formatBytes(s.totalBytes.value)}
          </span>
        </div>
      </div>
      <div class="storage-bottom">
        <p class="subtle">
          このサイトのモデル・辞書のみを管理します。
          <br />
          ブラウザの空き容量が不足すると、キャッシュが自動削除される場合があります。
        </p>
        <button
          class="text-button danger"
          disabled={!s.usedBytes.value || s.busy.value || s.downloading.value}
          onClick={s.removeAllAssets}
        >
          保存データをすべて削除
        </button>
      </div>
      <div
        class="disk-map"
        role="img"
        aria-label={`${progressLabel} ${formatBytes(receivedBytes)}、必要なデータ ${formatBytes(s.totalBytes.value)}`}
      >
        {groups.map((group, index) => {
          const list = assets.filter((a) => a.group === group),
            size = list.reduce((n, a) => n + a.bytes, 0),
            received = list.reduce((n, a) => n + receivedByAsset[a.id], 0);
          return (
            <div
              class="disk-group"
              style={{
                flexGrow: Math.max(
                  size / Math.max(s.totalBytes.value, 1),
                  0.025,
                ),
                "--group-color": groupColors[index % groupColors.length],
              }}
            >
              <div
                class="disk-fill"
                style={{ height: `${(100 * received) / Math.max(size, 1)}%` }}
              />
              <span>
                {group}
                <small>{formatBytes(size)}</small>
              </span>
            </div>
          );
        })}
      </div>
      <div class="storage-actions">
        <p class="subtle">塗りつぶされた領域が保存済みデータです。</p>
        {s.downloading.value ? (
          <button class="primary" onClick={s.cancelDownload}>
            ダウンロードを中止
          </button>
        ) : s.ready.value ? (
          <button class="primary" onClick={() => (s.tab.value = "voice")}>
            試してみる
            <RxArrowRight
              className="icon"
              aria-hidden="true"
              focusable="false"
            />
          </button>
        ) : (
          <button
            class="primary"
            disabled={!assets.length || s.busy.value}
            onClick={s.downloadAll}
          >
            <span>
              {s.usedBytes.value
                ? "残りをダウンロード"
                : "データをダウンロード"}{" "}
              <RxArrowDown
                className="icon"
                aria-hidden="true"
                focusable="false"
              />
            </span>
          </button>
        )}
      </div>
      <div class="storage-list">
        {groups.map((group, index) => (
          <details key={group}>
            <summary>
              <i
                style={{ background: groupColors[index % groupColors.length] }}
              />
              {group}
              <span>
                {formatBytes(
                  assets
                    .filter((a) => a.group === group)
                    .reduce((n, a) => n + a.bytes, 0),
                )}
              </span>
            </summary>
            <ul>
              {[
                ...new Set(
                  assets.filter((a) => a.group === group).map((a) => a.file),
                ),
              ].map((file) => {
                const parts = assets.filter((a) => a.file === file),
                  size = parts.reduce((n, a) => n + a.bytes, 0),
                  stored = parts.reduce(
                    (n, a) => n + (s.stored.value[a.id] ?? 0),
                    0,
                  ),
                  received = parts.reduce(
                    (n, a) => n + receivedByAsset[a.id],
                    0,
                  ),
                  active = parts.some((a) => a.id === selected.id),
                  label = parts[0].label.replace(/ \d+\/\d+$/, "");
                return (
                  <li key={file}>
                    <div>
                      <span>{label}</span>
                      <small>
                        {active
                          ? `${formatBytes(received)} / ${formatBytes(size)}`
                          : `${formatBytes(size)} · ${stored === size ? "保存済み" : stored ? "一部保存済み" : "未保存"}`}
                      </small>
                      {active && (
                        <progress
                          value={received}
                          max={size}
                          aria-label={`${label} のダウンロード`}
                        />
                      )}
                    </div>
                    <button
                      class="text-button"
                      disabled={!stored || s.busy.value || s.downloading.value}
                      onClick={() => s.removeFile(file)}
                      aria-label={`${label} のキャッシュを削除`}
                    >
                      削除
                    </button>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
function App() {
  return (
    <div class="app-shell">
      <header>
        <a
          class="brand"
          href="https://github.com/kaeru-shigure/hanezu-tts"
          aria-label="朱華 ホーム"
        >
          <img
            class="brand-mark"
            src="favicon.svg"
            alt=""
            width="44"
            height="44"
          />
          <span>
            朱華TTS<small>hanezu-tts</small>
          </span>
        </a>
        <span class="header-note">1.7Mパラメーターの軽量日本語TTSです。</span>
      </header>
      <main>
        <div class="tabs" role="tablist" aria-label="機能">
          {tabs.map(([tab, label], index) => (
            <button
              id={`tab-${tab}`}
              role="tab"
              aria-selected={s.tab.value === tab}
              aria-controls={`panel-${tab}`}
              tabIndex={s.tab.value === tab ? 0 : -1}
              onClick={() => (s.tab.value = tab)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const nextIndex =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? tabs.length - 1
                        : (index +
                            (event.key === "ArrowRight" ? 1 : -1) +
                            tabs.length) %
                          tabs.length;
                  s.tab.value = tabs[nextIndex][0];
                  document.getElementById(`tab-${s.tab.value}`)?.focus();
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {s.error.value && (
          <div class="error" role="alert">
            {s.error.value}
            <button
              class="text-button"
              onClick={() => (s.error.value = "")}
              aria-label="エラーを閉じる"
            >
              ×
            </button>
          </div>
        )}
        <Voice />
        <Storage />
        <section
          id="panel-model-card"
          role="tabpanel"
          aria-labelledby="tab-model-card"
          hidden={s.tab.value !== "model-card"}
        >
          <ModelCard />
        </section>
      </main>
      <footer>
        <span>
          <a href="https://github.com/kaeru-shigure/hanezu-tts">GitHub</a> ·{" "}
          <a href="https://huggingface.co/kaeru-shigure/hanezu-tts">
            HuggingFace
          </a>
        </span>
        <span>Created-by kaeru-shigure</span>
      </footer>
    </div>
  );
}
render(<App />, document.getElementById("app")!);
void s.initialize();
