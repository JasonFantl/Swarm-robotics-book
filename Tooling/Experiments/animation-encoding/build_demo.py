#!/usr/bin/env python3
"""Build demo.html: the single-file test bench for this experiment.

One self-contained HTML file (open directly, file://, no dependencies) embedding
every video encode from encoded/ as base64. Each card has the full control set
(play/pause, scrub, ±1 frame step, playback rate, download) plus live seek-latency
measurement and the encode's size/SSIM from results.tsv.

Videos use the strategy planned for the real book: base64 lives in a JSON block,
and a blob: URL is created when a card nears the viewport and revoked when it
leaves, so memory stays bounded no matter how many animations are embedded.

Image-based formats (APNG/WebP/GIF) are not embedded: they cannot pause, scrub,
or change speed, which fails the book's core requirements. Their stats are shown
in a table for the size comparison.
"""

import base64
import csv
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
FPS = 30

# (filename, description) — order is display order
VIDEOS = [
    ("vp9_crf10.webm",      "VP9 crf10, keyint 30 — near-lossless"),
    ("vp9_crf20.webm",      "VP9 crf20, keyint 30 — visually transparent"),
    ("vp9_crf20_444.webm",  "VP9 crf20, 4:4:4 chroma — compare colored-edge sharpness vs crf20"),
    ("vp9_crf32.webm",      "VP9 crf32, keyint 30 — recommended default"),
    ("vp9_crf32_g1.webm",   "VP9 crf32, all-intra — every frame a keyframe, best scrubbing"),
    ("vp9_crf32_g240.webm", "VP9 crf32, single keyframe — worst-case scrubbing"),
    ("av1_crf25.webm",      "AV1 crf25, keyint 30"),
    ("av1_crf35.webm",      "AV1 crf35, keyint 30 — smallest viable encode"),
    ("av1_crf35_g1.webm",   "AV1 crf35, all-intra"),
    ("h264_1200k.mp4",      "H.264 (openh264) 1200k — compatibility baseline, weak encoder"),
]

IMAGES = [
    ("apng_lossless.png",  "APNG, lossless"),
    ("webp_lossless.webp", "Animated WebP, lossless"),
    ("webp_q80.webp",      "Animated WebP, q80"),
    ("gif_64c.gif",        "GIF, 64 colors"),
]

MIME = {".webm": "video/webm", ".mp4": "video/mp4"}


def load_stats():
    stats = {}
    with open(os.path.join(HERE, "results.tsv")) as f:
        for row in csv.DictReader(f, delimiter="\t"):
            stats[row["name"]] = row
    return stats


def fmt_size(n):
    n = int(n)
    return f"{n/1e6:.2f} MB" if n >= 1e6 else f"{n/1e3:.0f} kB"


def main():
    stats = load_stats()
    entries = []
    for name, desc in VIDEOS:
        path = os.path.join(HERE, "encoded", name)
        s = stats.get(name, {})
        entries.append({
            "name": name,
            "desc": desc,
            "mime": MIME[os.path.splitext(name)[1]],
            "size": fmt_size(s.get("size_bytes", os.path.getsize(path))),
            "ssim": s.get("ssim", "?"),
            "b64": base64.b64encode(open(path, "rb").read()).decode("ascii"),
        })
        print(f"embedded {name}")

    img_rows = "\n".join(
        f"<tr><td><code>{name}</code></td><td>{desc}</td>"
        f"<td>{fmt_size(stats[name]['size_bytes'])}</td>"
        f"<td>{stats[name]['ssim']}</td></tr>"
        for name, desc in IMAGES if name in stats
    )

    html = HTML.replace("__PAYLOAD__", json.dumps(entries)) \
               .replace("__IMAGE_ROWS__", img_rows) \
               .replace("__FPS__", str(FPS))
    out = os.path.join(HERE, "demo.html")
    with open(out, "w") as f:
        f.write(html)
    print(f"wrote {out}: {fmt_size(os.path.getsize(out))}")


HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Animation encoding demo</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, sans-serif; margin: 2rem auto; max-width: 950px; padding: 0 1rem; }
  h1 { font-size: 1.4rem; }
  .card { border: 1px solid #8884; border-radius: 8px; padding: 1rem; margin: 1.5rem 0; }
  .card h2 { margin: 0 0 .25rem; font-size: 1.05rem; font-family: ui-monospace, monospace; }
  .meta { color: #888; font-size: .85rem; margin-bottom: .5rem; }
  video { width: 100%; background: #fff; border: 1px solid #8884; aspect-ratio: 4/3; }
  .controls { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; margin-top: .5rem; }
  .controls input[type=range] { flex: 1; min-width: 200px; }
  button { padding: .3rem .7rem; }
  .stats { font-size: .85rem; color: #666; margin-top: .3rem; font-family: ui-monospace, monospace; }
  table { border-collapse: collapse; font-size: .9rem; }
  td, th { border: 1px solid #8884; padding: .3rem .6rem; text-align: left; }
</style>
</head>
<body>
<h1>Animation encoding demo</h1>
<p>Self-contained — every video below is embedded in this file, exactly as the book
will ship. For each encode, test:</p>
<ol>
  <li><b>Quality</b> — dot edges, line crispness, color smearing (all encodes are of
      the identical source animation).</li>
  <li><b>Scrubbing</b> — drag the slider; does the frame track smoothly? Watch the
      live seek-latency readout, especially on the keyint-comparison encodes.</li>
  <li><b>Stepping</b> — ±1 frame buttons, forward and backward.</li>
  <li><b>Speed</b> — playback-rate menu.</li>
  <li><b>Downloading</b> — right-click → Save Video As. Note per browser whether it
      is enabled and what filename it offers (blob sources have no intrinsic name).</li>
</ol>
<p>Videos load lazily: the blob is created when a card scrolls near the viewport and
released when it leaves — the strategy for the real book, so 100 embedded animations
never sit in memory at once.</p>

<div id="cards"></div>

<h1>Image-based formats (not embedded)</h1>
<p>APNG / animated WebP / GIF play in an <code>&lt;img&gt;</code> tag with no pause,
no scrub, no speed control — they fail the core requirements, and the lossless ones
are 15–45× larger. Files are in <code>encoded/</code> if you want to look:</p>
<table>
<tr><th>file</th><th>format</th><th>size</th><th>SSIM</th></tr>
__IMAGE_ROWS__
</table>

<script id="anim-data" type="application/json">__PAYLOAD__</script>
<script>
const FPS = __FPS__;
const ANIMS = JSON.parse(document.getElementById("anim-data").textContent);

function b64ToBlob(b64, mime) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function makeCard(anim, idx) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.idx = idx;
  card.innerHTML = `
    <h2>${anim.name}</h2>
    <div class="meta">${anim.desc} — ${anim.size}, SSIM ${anim.ssim}</div>
    <video preload="auto" autoplay muted playsinline loop></video>
    <div class="controls">
      <button class="play">⏯</button>
      <button class="back">−1f</button>
      <button class="fwd">+1f</button>
      <input type="range" class="scrub" min="0" max="1" step="0.001" value="0">
      <select class="rate">
        <option value="1" selected>1×</option><option value="0.5">0.5×</option>
        <option value="0.25">0.25×</option><option value="0.1">0.1×</option>
      </select>
    </div>
    <div class="stats">frame: <span class="frame">0</span> · seek latency: <span class="lat">–</span></div>`;

  const v = card.querySelector("video");
  const scrub = card.querySelector(".scrub");
  const latEl = card.querySelector(".lat");
  const frameEl = card.querySelector(".frame");
  const lats = [];
  let seekStart = 0;

  function seekTo(t) {
    seekStart = performance.now();
    v.currentTime = Math.max(0, Math.min(v.duration || 8, t));
  }
  v.addEventListener("seeked", () => {
    lats.push(performance.now() - seekStart);
    if (lats.length > 40) lats.shift();
    const avg = lats.reduce((a, b) => a + b, 0) / lats.length;
    latEl.textContent = `${lats[lats.length-1].toFixed(0)} ms (avg ${avg.toFixed(0)} ms over ${lats.length})`;
  });
  v.addEventListener("timeupdate", () => {
    if (!scrub.matches(":active")) scrub.value = v.currentTime / (v.duration || 8);
    frameEl.textContent = Math.round(v.currentTime * FPS);
  });

  card.querySelector(".play").onclick = () => v.paused ? v.play() : v.pause();
  card.querySelector(".back").onclick = () => { v.pause(); seekTo(v.currentTime - 1 / FPS); };
  card.querySelector(".fwd").onclick  = () => { v.pause(); seekTo(v.currentTime + 1 / FPS); };
  card.querySelector(".rate").onchange = e => v.playbackRate = +e.target.value;
  scrub.addEventListener("input", () => { v.pause(); seekTo(scrub.value * (v.duration || 8)); });
  return card;
}

const observer = new IntersectionObserver(entries => entries.forEach(e => {
  const v = e.target.querySelector("video");
  const anim = ANIMS[+e.target.dataset.idx];
  if (e.isIntersecting && !v.src) {
    v.src = URL.createObjectURL(b64ToBlob(anim.b64, anim.mime));
    if (v.dataset.resume) v.currentTime = +v.dataset.resume;
    v.play().catch(() => {});
  } else if (!e.isIntersecting && v.src) {
    v.dataset.resume = v.currentTime;
    URL.revokeObjectURL(v.src);
    v.removeAttribute("src");
    v.load();
  }
}), { rootMargin: "300px" });

ANIMS.forEach((anim, i) => {
  const card = makeCard(anim, i);
  document.getElementById("cards").appendChild(card);
  observer.observe(card);
});
</script>
</body>
</html>
"""

if __name__ == "__main__":
    main()
