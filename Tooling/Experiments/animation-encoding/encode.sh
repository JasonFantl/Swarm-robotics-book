#!/usr/bin/env bash
# Encode the generated frame sequence into candidate formats/settings.
# Writes outputs to encoded/ and a size+quality table to results.tsv.
#
# Variables explored:
#   - codec: H.264 (openh264), VP9, AV1 (SVT), APNG, WebP, GIF, FFV1
#   - quality level (CRF sweep)
#   - keyframe interval (-g): affects scrub/step responsiveness vs size
#   - chroma subsampling: yuv420p vs yuv444p (color edge sharpness)

set -euo pipefail
cd "$(dirname "$0")"

FRAMES="frames/frame_%04d.png"
FPS=30
OUT=encoded
mkdir -p "$OUT"

RESULTS=results.tsv
echo -e "name\tsize_bytes\tssim" > "$RESULTS"

# ssim <file> : compute SSIM of an encoded file against the source frames.
# Timebases must be normalized (settb/setpts) or framesync misaligns frames
# and even lossless codecs score <1.0.
ssim() {
    ffmpeg -hide_banner -i "$1" -framerate $FPS -i "$FRAMES" \
        -lavfi "[0:v]settb=AVTB,setpts=N/$FPS/TB[a];[1:v]settb=AVTB,setpts=N/$FPS/TB[b];[a][b]ssim" \
        -f null - 2>&1 |
        grep -oP 'All:\K[0-9.]+' | tail -1
}

record() {
    local f="$OUT/$1"
    local size s
    size=$(stat -c%s "$f")
    s=$(ssim "$f" || echo "n/a")
    echo -e "$1\t$size\t$s" >> "$RESULTS"
    echo "== $1: $size bytes, ssim=$s"
}

enc() {
    local name="$1"; shift
    echo "--- encoding $name"
    ffmpeg -hide_banner -loglevel warning -y -framerate $FPS -i "$FRAMES" "$@" "$OUT/$name"
    record "$name"
}

# --- H.264 baseline (openh264 has no CRF mode; bitrate-targeted) ---
enc h264_1200k.mp4      -c:v libopenh264 -b:v 1200k -g 30 -pix_fmt yuv420p -movflags +faststart

# --- VP9: quality sweep at keyint 30 ---
enc vp9_crf20.webm      -c:v libvpx-vp9 -crf 20 -b:v 0 -row-mt 1 -g 30 -pix_fmt yuv420p
enc vp9_crf32.webm      -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -g 30 -pix_fmt yuv420p

# --- VP9: keyframe interval sweep at crf 32 (scrub responsiveness test) ---
enc vp9_crf32_g1.webm   -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -g 1   -pix_fmt yuv420p
enc vp9_crf32_g240.webm -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -g 240 -pix_fmt yuv420p

# --- VP9: chroma subsampling comparison ---
enc vp9_crf20_444.webm  -c:v libvpx-vp9 -crf 20 -b:v 0 -row-mt 1 -g 30 -pix_fmt yuv444p

# --- VP9: near-lossless ---
enc vp9_crf10.webm      -c:v libvpx-vp9 -crf 10 -b:v 0 -row-mt 1 -g 30 -pix_fmt yuv420p

# --- AV1 (SVT): quality sweep ---
enc av1_crf25.webm      -c:v libsvtav1 -crf 25 -preset 5 -g 30 -pix_fmt yuv420p
enc av1_crf35.webm      -c:v libsvtav1 -crf 35 -preset 5 -g 30 -pix_fmt yuv420p
enc av1_crf35_g1.webm   -c:v libsvtav1 -crf 35 -preset 5 -g 1  -pix_fmt yuv420p

# --- Image-sequence formats (no native scrubbing in <img>) ---
enc apng_lossless.png   -c:v apng -plays 0 -f apng
enc webp_lossless.webp  -c:v libwebp_anim -lossless 1 -loop 0
enc webp_q80.webp       -c:v libwebp_anim -q:v 80 -loop 0

# --- GIF (palette-quantized; quality reference only) ---
echo "--- encoding gif"
ffmpeg -hide_banner -loglevel warning -y -framerate $FPS -i "$FRAMES" \
    -vf "split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer" \
    "$OUT/gif_64c.gif"
record gif_64c.gif

# --- FFV1 (lossless archival master reference, not for web) ---
enc ffv1_master.mkv     -c:v ffv1 -level 3

echo
echo "All done. Results:"
column -t "$RESULTS"
