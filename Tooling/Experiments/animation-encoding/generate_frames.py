#!/usr/bin/env python3
"""Generate a representative test animation for encoding experiments.

Produces a boids-style flocking animation similar in visual character to the
book's expected figures: flat light background, antialiased colored dots,
thin neighbor lines. Deterministic (fixed seed) so encodes are comparable
across runs.

Output: frames/frame_%04d.png
"""

import os

import numpy as np
from PIL import Image, ImageDraw

WIDTH, HEIGHT = 1200, 900
FPS = 30
SECONDS = 8
N_FRAMES = FPS * SECONDS
N_BOIDS = 70
SUPERSAMPLE = 2  # render at 2x and downscale for antialiasing

NEIGHBOR_RADIUS = 130.0
SEPARATION_RADIUS = 40.0
MAX_SPEED = 220.0  # px/s
DT = 1.0 / FPS

BG = (250, 250, 248)
LINE_COLOR = (200, 205, 215)
PALETTE = [
    (31, 119, 180),
    (214, 89, 60),
    (44, 140, 84),
]

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frames")


def limit_speed(vel):
    speed = np.linalg.norm(vel, axis=1, keepdims=True)
    return np.where(speed > MAX_SPEED, vel / speed * MAX_SPEED, vel)


def step(pos, vel):
    diff = pos[:, None, :] - pos[None, :, :]  # diff[i,j] = pos_i - pos_j
    dist = np.linalg.norm(diff, axis=2)
    np.fill_diagonal(dist, np.inf)

    neighbor = dist < NEIGHBOR_RADIUS
    close = dist < SEPARATION_RADIUS

    accel = np.zeros_like(vel)

    # Cohesion: steer toward neighbor centroid
    n_count = neighbor.sum(axis=1, keepdims=True)
    has_n = n_count[:, 0] > 0
    centroid = (neighbor[:, :, None] * pos[None, :, :]).sum(axis=1) / np.maximum(n_count, 1)
    accel[has_n] += (centroid[has_n] - pos[has_n]) * 0.8

    # Alignment: match neighbor velocity
    mean_vel = (neighbor[:, :, None] * vel[None, :, :]).sum(axis=1) / np.maximum(n_count, 1)
    accel[has_n] += (mean_vel[has_n] - vel[has_n]) * 1.5

    # Separation: push away from very close boids
    with np.errstate(invalid="ignore", divide="ignore"):
        push = np.where(close[:, :, None], diff / (dist[:, :, None] ** 2), 0.0)
    accel += np.nan_to_num(push.sum(axis=1)) * 4000.0

    # Soft wall repulsion
    margin = 80.0
    accel[:, 0] += np.where(pos[:, 0] < margin, (margin - pos[:, 0]) * 6, 0)
    accel[:, 0] -= np.where(pos[:, 0] > WIDTH - margin, (pos[:, 0] - (WIDTH - margin)) * 6, 0)
    accel[:, 1] += np.where(pos[:, 1] < margin, (margin - pos[:, 1]) * 6, 0)
    accel[:, 1] -= np.where(pos[:, 1] > HEIGHT - margin, (pos[:, 1] - (HEIGHT - margin)) * 6, 0)

    vel = limit_speed(vel + accel * DT)
    return pos + vel * DT, vel, neighbor, dist


def render(pos, neighbor, dist, colors):
    s = SUPERSAMPLE
    img = Image.new("RGB", (WIDTH * s, HEIGHT * s), BG)
    draw = ImageDraw.Draw(img)

    # Neighbor lines (draw each pair once)
    ii, jj = np.where(np.triu(neighbor & (dist < NEIGHBOR_RADIUS)))
    for i, j in zip(ii, jj):
        draw.line(
            [tuple(pos[i] * s), tuple(pos[j] * s)],
            fill=LINE_COLOR,
            width=s,
        )

    r = 7 * s
    for i, p in enumerate(pos):
        x, y = p * s
        draw.ellipse([x - r, y - r, x + r, y + r], fill=colors[i])

    return img.resize((WIDTH, HEIGHT), Image.LANCZOS)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    rng = np.random.default_rng(42)

    pos = rng.uniform([100, 100], [WIDTH - 100, HEIGHT - 100], (N_BOIDS, 2))
    angle = rng.uniform(0, 2 * np.pi, N_BOIDS)
    vel = np.stack([np.cos(angle), np.sin(angle)], axis=1) * MAX_SPEED * 0.6
    colors = [PALETTE[i % len(PALETTE)] for i in range(N_BOIDS)]

    for f in range(N_FRAMES):
        pos, vel, neighbor, dist = step(pos, vel)
        img = render(pos, neighbor, dist, colors)
        img.save(os.path.join(OUT_DIR, f"frame_{f:04d}.png"), optimize=False)
        if f % 30 == 0:
            print(f"frame {f}/{N_FRAMES}")

    print(f"done: {N_FRAMES} frames at {WIDTH}x{HEIGHT} in {OUT_DIR}")


if __name__ == "__main__":
    main()
