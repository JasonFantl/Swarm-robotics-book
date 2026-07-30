#!/usr/bin/env python3
"""Build controls.html: explore control options for the book's animations.

Philosophy: use the browser's native <video controls> UI wherever possible, add
the absolute minimum on top. One video (the recommended encode) is embedded once
and shared by every variant via a single blob: URL.

Variants:
  1. `controls` attribute alone — zero JS, the pure browser default.
  2. Hover-only controls — native UI, but the attribute is toggled on
     mouseenter/mouseleave (touch: first tap shows). ~4 lines of JS.
  3. Trimmed native controls — controlslist / disablepictureinpicture to remove
     fullscreen, remote-playback, PiP from the native UI.
  4. Native + keyboard frame-step — variant 2 plus , / . to step one frame when
     the video is focused (the one thing native controls lack).
"""

import base64
import os

HERE = os.path.dirname(os.path.abspath(__file__))
VIDEO = "vp9_crf32.webm"
FPS = 30


def main():
    path = os.path.join(HERE, "encoded", VIDEO)
    b64 = base64.b64encode(open(path, "rb").read()).decode("ascii")
    html = HTML.replace("__B64__", b64).replace("__FPS__", str(FPS)) \
               .replace("__NAME__", VIDEO)
    out = os.path.join(HERE, "controls.html")
    with open(out, "w") as f:
        f.write(html)
    print(f"wrote {out}: {os.path.getsize(out)/1e6:.2f} MB")


HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Animation controls demo</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, sans-serif; margin: 2rem auto; max-width: 750px; padding: 0 1rem; }
  h2 { font-size: 1.05rem; margin: 2.5rem 0 .3rem; }
  p { color: #777; font-size: .9rem; margin: .3rem 0 .8rem; }
  video { width: 100%; background: #fff; border: 1px solid #8884; }
</style>
</head>
<body>
<h1>Animation controls demo</h1>
<p>All variants below use the browser's <b>native</b> video controls — no custom
widgets. Same video (__NAME__) in each. Right-click → Save Video As should work on
all of them. Where native controls put the speed menu: Chrome/Edge in the ⋮ overflow
menu, Firefox in the right-click context menu ("Play Speed"), Safari in the ⏩/AB
controls.</p>

<p>All videos autoplay: <code>autoplay muted playsinline</code> — browsers only
allow autoplay when muted (the animations are silent anyway, but the attribute is
required by autoplay policy).</p>

<h2>1. Browser default (zero JS)</h2>
<p>Just <code>&lt;video controls autoplay muted playsinline loop&gt;</code>. Native
behavior already fades controls out during playback and brings them back on hover;
when paused they stay visible.</p>
<video controls autoplay muted playsinline loop></video>

<h2>2. Hover-only controls</h2>
<p>Native UI, but the <code>controls</code> attribute is only present while the
pointer is over the video (touch: tap shows them). Video looks like a clean figure
until you interact.</p>
<video id="hover" autoplay muted playsinline loop></video>

<h2>3. Trimmed native controls</h2>
<p><code>controlslist="nofullscreen noremoteplayback"
disablepictureinpicture</code>. Caveat: this is a <em>hint</em>, not a rule —
Chrome/Edge hide these buttons, Firefox ignores the attribute, and there is no
cross-browser way to remove or restyle individual native controls (they live in a
closed shadow DOM). Getting exact control over the buttons would mean building
custom controls. Since hover-only hides the whole bar except during interaction,
the pragmatic choice is to accept the native bar as-is.</p>
<video controls controlslist="nofullscreen noremoteplayback" disablepictureinpicture autoplay muted playsinline loop></video>

<h2>4. Hover-only + keyboard frame-step</h2>
<p>Variant 2 plus the one thing native controls lack: with the video focused
(click it once), <kbd>,</kbd> and <kbd>.</kbd> step one frame back/forward
(YouTube's convention), <kbd>space</kbd> toggles play.</p>
<video id="step" tabindex="0" autoplay muted playsinline loop></video>

<script id="payload" type="text/plain">__B64__</script>
<script>
const FPS = __FPS__;
const bin = atob(document.getElementById("payload").textContent.trim());
const bytes = new Uint8Array(bin.length);
for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
const url = URL.createObjectURL(new Blob([bytes], { type: "video/webm" }));
document.querySelectorAll("video").forEach(v => v.src = url);

// Hover-only controls (variants 2 and 4)
for (const v of [document.getElementById("hover"), document.getElementById("step")]) {
  v.addEventListener("mouseenter", () => v.controls = true);
  v.addEventListener("mouseleave", () => v.controls = false);
  v.addEventListener("touchstart", () => v.controls = true, { passive: true });
}

// Keyboard frame-step (variant 4)
document.getElementById("step").addEventListener("keydown", e => {
  const v = e.currentTarget;
  if (e.key === ",")      { v.pause(); v.currentTime -= 1 / FPS; }
  else if (e.key === ".") { v.pause(); v.currentTime += 1 / FPS; }
  else if (e.key === " ") { v.paused ? v.play() : v.pause(); }
  else return;
  e.preventDefault();
});
</script>
</body>
</html>
"""

if __name__ == "__main__":
    main()
