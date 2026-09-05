#!/usr/bin/env python3
"""Deterministic QA helpers for free-local ad creatives (HTML / HyperFrames PNGs).

No generative APIs. No network. Fixes belong in HTML/MG layers only.

Checks:
  - image dimensions vs expected
  - optional contrast placeholder (luminance delta sample)
  - optional text-diff against intended copy JSON if provided

No network. No secrets. OCR is out of scope — pass --ocr-text if you already extracted text.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


def load_copy(path: Path | None) -> dict:
    if not path:
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise SystemExit("copy JSON must be an object")
    return data


def image_size(path: Path) -> tuple[int, int]:
    # Prefer Pillow if present; else PNG header; else fail clearly.
    try:
        from PIL import Image  # type: ignore

        with Image.open(path) as im:
            return im.size
    except Exception:
        pass

    raw = path.read_bytes()
    if raw[:8] == b"\x89PNG\r\n\x1a\n" and len(raw) >= 24:
        w = int.from_bytes(raw[16:20], "big")
        h = int.from_bytes(raw[20:24], "big")
        return w, h
    raise SystemExit(
        "Cannot read image size. Install Pillow (`pip install pillow`) "
        "or provide a PNG with valid IHDR."
    )


def norm(s: str) -> str:
    s = s.casefold()
    s = re.sub(r"\s+", " ", s).strip()
    return s


def text_diff(intended: dict, ocr_text: str) -> list[str]:
    fails = []
    blob = norm(ocr_text)
    for key in ("headline", "body", "cta", "legal", "price"):
        val = intended.get(key)
        if val is None or val == "":
            continue
        if norm(str(val)) not in blob:
            fails.append(f"missing or mismatched copy field '{key}': {val!r}")
    return fails


def contrast_placeholder(path: Path) -> str:
    """Best-effort note — not a WCAG cert.

    Samples corner vs center luminance if Pillow+RGB available.
    """
    try:
        from PIL import Image  # type: ignore

        with Image.open(path) as im:
            im = im.convert("RGB")
            w, h = im.size
            samples = [
                im.getpixel((w // 2, h // 2)),
                im.getpixel((max(0, w // 10), max(0, h // 10))),
                im.getpixel((max(0, w // 10), min(h - 1, 9 * h // 10))),
            ]

            def lum(rgb: tuple[int, int, int]) -> float:
                r, g, b = [c / 255.0 for c in rgb]
                return 0.2126 * r + 0.7152 * g + 0.0722 * b

            ls = [lum(s) for s in samples]
            delta = max(ls) - min(ls)
            return (
                f"contrast_placeholder_delta={delta:.3f} "
                f"(informational only; verify text/bg manually)"
            )
    except Exception:
        return "contrast_placeholder=skipped (Pillow unavailable or non-RGB)"


def main() -> int:
    p = argparse.ArgumentParser(description="QA checks for ad creatives")
    p.add_argument("--image", type=Path, help="Path to PNG/JPEG")
    p.add_argument("--expect-w", type=int, help="Expected width px")
    p.add_argument("--expect-h", type=int, help="Expected height px")
    p.add_argument("--copy", type=Path, help="Intended copy JSON")
    p.add_argument(
        "--ocr-text",
        type=Path,
        help="Optional file with extracted/OCR text for copy diff",
    )
    p.add_argument("--contrast", action="store_true", help="Run contrast placeholder")
    args = p.parse_args()

    if not args.image and not args.copy:
        p.print_help()
        return 2

    fails: list[str] = []
    notes: list[str] = []

    if args.image:
        if not args.image.exists():
            fails.append(f"image not found: {args.image}")
        else:
            w, h = image_size(args.image)
            notes.append(f"size={w}x{h}")
            if args.expect_w and w != args.expect_w:
                fails.append(f"width {w} != expected {args.expect_w}")
            if args.expect_h and h != args.expect_h:
                fails.append(f"height {h} != expected {args.expect_h}")
            if args.contrast:
                notes.append(contrast_placeholder(args.image))

    intended = load_copy(args.copy)
    if args.copy and not args.ocr_text:
        notes.append(
            "copy JSON loaded; provide --ocr-text to diff against extracted text"
        )
    if args.ocr_text:
        if not intended:
            fails.append("ocr-text provided but --copy JSON missing — STOP")
        else:
            ocr = args.ocr_text.read_text(encoding="utf-8")
            fails.extend(text_diff(intended, ocr))

    for n in notes:
        print(f"NOTE\t{n}")
    if fails:
        for f in fails:
            print(f"FAIL\t{f}")
        print("RESULT\tFAIL")
        return 1
    print("RESULT\tPASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
