# Animation encoding experiment

Goal: pick the delivery format for the book's animations (~100 animations, ~8 s each,
various resolutions).

Requirements, in priority order:

1. **Scrubbing** — pause, drag through time, step forward/backward a frame or two.
2. **Download** — right-click → save-as must hand the reader a single usable file.
3. **Speed control** — slow playback down.
4. **Size** — small enough that a page with several animations loads fast.
5. **Quality** — near-lossless; flat colors and thin lines must stay crisp.

## Layout

- `generate_frames.py` — renders a deterministic boids animation (1200×900, 30 fps, 8 s,
  240 frames) in the visual style of the book's figures: flat background, antialiased
  dots, thin neighbor lines. Output goes to `frames/`.
- `encode.sh` — encodes `frames/` into every candidate (H.264, VP9, AV1, APNG,
  animated WebP, GIF, FFV1), sweeping quality (CRF), keyframe interval (`-g`), and
  chroma subsampling. Writes `encoded/` and a `results.tsv` with size + SSIM vs source.
- `build_demo.py` → `demo.html` — the encoding test bench: one self-contained HTML
  file (open directly, no dependencies) embedding every video encode as base64,
  exactly as the book will ship. Per-encode scrub slider, ±1-frame step buttons,
  playback-rate menu, live seek-latency measurement, and size/SSIM stats.
  Downloading is via right-click → Save Video As. Image formats aren't embedded
  (they can't scrub at all and the lossless ones are huge); their stats appear in
  a table.
- `build_controls_demo.py` → `controls.html` — the controls test bench: the
  recommended encode shown with the browser's **native** controls in four variants
  (pure default, hover-only, trimmed via `controlslist`, hover-only + keyboard
  frame-step). No custom widgets. All videos autoplay (`autoplay muted playsinline`
  — the muted attribute is required by browser autoplay policy even for silent
  video). Note: `controlslist` trimming is a hint honored only by Chrome/Edge;
  native controls are a closed shadow DOM, so there is no cross-browser way to
  remove or restyle individual buttons short of building custom controls.

## Run

```sh
python3 generate_frames.py   # ~1 min
./encode.sh                  # several min (VP9/AV1 are slow)
python3 build_demo.py          # embed all video encodes into demo.html
python3 build_controls_demo.py # build controls.html (native-controls variants)
# then open demo.html and controls.html in a browser
```

## What each variable tests

- **Codec / CRF** — size-vs-quality frontier. SSIM in `results.tsv` gives a number;
  eyeball colored dot edges in `demo.html` for chroma smearing.
- **Keyframe interval (`-g`)** — the crux for scrubbing. Seeking to an arbitrary frame
  requires decoding from the previous keyframe, so sparse keyframes (g=240) make
  scrubbing/backward-stepping laggy, while all-intra (g=1) makes every frame instantly
  seekable at a size cost. g=30 (1 keyframe/s) is the middle ground to beat.
- **4:2:0 vs 4:4:4 chroma** — 4:2:0 halves chroma resolution, which blurs colored
  edges on line art. 4:4:4 fixes it but browser/hardware support is spottier.
- **Video vs image formats** — APNG/WebP/GIF in `<img>` can't pause or scrub at all,
  which fails requirement 1; their stats appear in `demo.html`'s comparison table.

## Findings (2026-07-30, 1200×900 @ 30 fps, 8 s test clip)

Raw numbers in `results.tsv`. SSIM is against the source PNG frames; the lossless
encodes (APNG, FFV1) score exactly 1.0, which validates the measurement. (An earlier
run showed <1.0 for lossless files — that was a timebase mismatch in the SSIM filter
graph, fixed via `settb`/`setpts` normalization.)

| encode | size | SSIM | notes |
|---|---|---|---|
| AV1 crf35, g30 | 0.66 MB | 0.9960 | best size/quality ratio |
| VP9 crf32, g240 | 1.03 MB | 0.9968 | single keyframe — scrub test case |
| H.264 (openh264) 1200k | 1.16 MB | 0.9913 | clearly worse quality at same size |
| VP9 crf32, g30 | 1.18 MB | 0.9970 | the compatibility-safe sweet spot |
| AV1 crf25, g30 | 1.31 MB | 0.9979 | |
| VP9 crf20, g30 | 2.44 MB | 0.9986 | visually transparent |
| VP9 crf20 4:4:4 | 2.78 MB | 0.9986 | +14% size for full-res chroma |
| AV1 crf35, all-intra | 2.78 MB | 0.9944 | 4.2× the g30 size |
| VP9 crf10, g30 | 4.23 MB | 0.9993 | near-lossless |
| WebP q80 | 5.72 MB | – | `<img>` only: no pause/scrub |
| VP9 crf32, all-intra | 8.31 MB | 0.9992 | 7× the g30 size |
| GIF 64-color | 12.7 MB | 0.8121 | terrible on every axis |
| WebP lossless | 17.8 MB | – | (ffmpeg can't decode animated WebP → no SSIM) |
| APNG lossless | 30.3 MB | 1.0000 | |
| FFV1 (archival) | 29.8 MB | 1.0000 | keep as master format, not for web |

Takeaways:

- **Video beats image formats on every requirement.** APNG/WebP/GIF are 5–45× larger
  *and* can't pause or scrub. Eliminated.
- **Keyframe interval: g=30 (1/s) is the right tradeoff.** All-intra costs 4–7× in
  size; a single keyframe saves only ~13% over g=30. With g=30 a worst-case seek
  decodes ≤29 frames of this content, which is fast — verify felt latency in
  `demo.html` (it measures seek latency live).
- **VP9 crf~30, g=30, yuv420p is the recommended default**: ~1.2 MB for 8 s at
  1200×900, SSIM 0.997, plays everywhere that matters (Chrome, Firefox, Edge,
  Safari 14+). ~100 animations ≈ 120 MB total, ~1 MB each per page view.
- **AV1 is ~45% smaller at equal quality** but Safari only plays it with hardware
  decode (M3+/A17+). Option: `<source>` AV1 + VP9 fallback — costs double encoding
  and storage, and right-click saves whichever source the browser picked.
- **openh264 is not a fair H.264 test** (no CRF mode, weak encoder) — if H.264 is ever
  needed for compatibility, re-test with x264 before judging. But VP9 support is broad
  enough that H.264 looks unnecessary.
- **4:2:0 vs 4:4:4**: identical SSIM at crf20; judge the colored dot edges visually in
  `demo.html` before paying the compatibility risk of 4:4:4 (profile-1 VP9 doesn't
  hardware-decode everywhere). At these dot sizes 4:2:0 looks acceptable.
- Keep sources renderable: archive either the PNG frames or an FFV1 master per
  animation so everything can be re-encoded when the delivery choice changes.

### Recommendation

**VP9 in WebM, crf 32, keyframe every second, 4:2:0**, embedded in the book HTML as
base64 with lazy `blob:` URLs (as `demo.html` does), downloading via right-click.

**Controls: the pure browser default** (`controls.html` variant 1), zero JS:

```html
<video controls autoplay muted playsinline loop></video>
```

- `autoplay` so readers immediately recognize it as a video, not a static figure
  (`muted` is required by autoplay policy even though the animations are silent).
- Native controls already fade out during playback and return on hover, which keeps
  the figure clean-looking without any custom show/hide logic.

Encode command:

```sh
ffmpeg -framerate 30 -i frame_%04d.png \
    -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -g 30 -pix_fmt yuv420p \
    animation.webm
```

Why: SSIM 0.997 at ~1.2 MB per 8 s of 1200×900 (≈160 MB book with 100 animations
after base64), plays in every modern browser including Safari 14+, and g=30 keeps
scrubbing/stepping responsive at a ~15% size cost over sparse keyframes. Scale `-g`
to the frame rate (one keyframe per second, i.e. `-g <fps>`).

Adjust per animation, verified visually in `demo.html`:
- Content with fine texture or heavy motion looking soft → drop toward `-crf 20`
  (visually transparent, ~2× size).
- Visible color fringing on thin colored lines → try `-pix_fmt yuv444p` for that
  animation only, and check it still plays on a Mac/iOS device before keeping it.

Revisit AV1 (`-c:v libsvtav1 -crf 35 -preset 5 -g 30`, ~45% smaller) if total file
size becomes the binding constraint and Safari-on-older-hardware readers stop
mattering; the encode pipeline is otherwise identical.

## Single-file shipping (`file://`, no server)

The book will ship as one self-contained HTML file that readers double-click — no
web server. That changes the download story:

- **Why "Save Video As" is greyed out from `file://`**: Chrome's context-menu save
  hands the video's URL to its download manager, which refuses `file://` URLs, so
  the item is disabled on pages opened from disk (Firefox allows it). This goes away
  once videos are embedded — the source becomes a `blob:` URL, not `file://`.
- `demo.html` embeds each video's base64 in a JSON block and creates a `blob:` URL
  only while the card is near the viewport, revoking it when it scrolls away. That's
  the plan for the real book: with ~100 embedded animations, you don't want 100
  decoders and 100 giant strings live at once.
- **Decision: downloading is right-click → Save Video As only, no download button.**
  Known tradeoff: a `blob:` URL has no intrinsic filename, so the save dialog will
  offer something generic (browser-dependent, possibly a UUID without extension) —
  verify per browser whether the offered name is acceptable.
- To verify per browser (open `demo.html` by double-clicking): is right-click save
  enabled? What filename does it offer? Do videos load as they scroll into view?
- **Size math**: base64 costs +33%. 100 animations × 8 s at 1200×900:
  VP9 crf32 → ~160 MB single file; AV1 crf35 → ~88 MB. Lower resolutions shrink
  roughly linearly with pixel count. If that's too heavy, the fallback is one HTML
  plus a sibling `animations/` folder (relative `src` works from `file://`), at the
  cost of "keep the folder next to the file" instructions and the greyed-out
  right-click issue above.

## Notes / prior knowledge going in

- `<video>` right-click gives "Save Video As" in all major browsers; a single .webm/.mp4
  file is self-contained and plays in any local player. ✔ requirement 2.
- `<img>`-based formats (APNG/WebP/GIF) save fine but have no playback controls at all,
  so they're out unless wrapped in a JS player — which then breaks save-as.
- This machine's ffmpeg is Fedora's ffmpeg-free: no x264, only openh264 (worse
  compression, no CRF mode). If H.264 wins on compatibility grounds, encode the real
  files with x264 (e.g. via RPM Fusion ffmpeg or a container) before judging its size.
- Safari supports VP9 (14+) broadly, AV1 only with hardware decode (M3+/A17+);
  H.264 works everywhere. A `<video>` tag can list multiple `<source>`s as a fallback
  chain, but then save-as grabs whichever source was selected.
