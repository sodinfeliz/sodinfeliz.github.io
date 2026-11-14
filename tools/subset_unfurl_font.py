#!/usr/bin/env python3
"""Cuts the Unfurl pages' Chinese font down to the characters those pages use.

The app sets Chinese in GenSenRounded; the whole family is far too large for a web page, so the pages carry
only the glyphs that appear in them. Run this again after changing any Chinese text under public/unfurl/zh/,
or a new character falls back to the system's face.

    uv run --with "fonttools[woff]" python tools/subset_unfurl_font.py <folder holding GenSenRounded2TW-*.otf>
"""
import sys
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "public" / "unfurl" / "zh"
OUT = ROOT / "public" / "unfurl" / "fonts"
# Regular for running text, Bold for headings and anything set at 600 or more.
WEIGHTS = {"R": "regular", "B": "bold"}


def main() -> None:
    source = Path(sys.argv[1])
    text = "".join(page.read_text(encoding="utf-8") for page in PAGES.rglob("*.html"))
    # Latin letters and digits are Nunito's; everything from the CJK punctuation block up is kept here.
    wanted = sorted({ord(c) for c in text if ord(c) >= 0x2E80 or c in "—…‧·“”‘’"})
    for code, name in WEIGHTS.items():
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        font = subset.load_font(str(source / f"GenSenRounded2TW-{code}.otf"), options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=wanted)
        subsetter.subset(font)
        target = OUT / f"gensenrounded-{name}.woff2"
        subset.save_font(font, str(target), options)
        print(f"{target.name}: {len(wanted)} characters, {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
