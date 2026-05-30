#!/usr/bin/env python3
"""Bundle src/ back into a single Holy_Book HTML file.

Usage:
  python3 scripts/build.py                 # writes Holy_Book_v3_46.html
  python3 scripts/build.py --out file.html

How it works
------------
- Loads build/manifest.template.json (uuid -> {_name, mime, compressed})
- For each entry, reads bytes from `src/<_name>` (or, when split, concats
  multiple `src/...` files in the order declared by `_parts`).
- Optional gzip + base64.
- Renders build/shell.html with __MANIFEST__ replaced by the JSON.

The split mapping for the kit (701bc8db) and the cover/app shell
(63b7462f) is via build/manifest.template.json — when entries get a
`_parts` array we concat in that order.
"""
from __future__ import annotations

import argparse
import base64
import gzip
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
BUILD = ROOT / "build"


def escape_bundler_template_end_tags(shell_html: str) -> str:
    """Prevent HTML parsers from closing <script type=\"__bundler/template\"> early.

    The inner blob is JSON that contains markup with real </script> tags. Browsers treat
    the first </script substring as end of script — even inside a JSON string — which
    truncates templateEl.textContent and breaks JSON.parse (file:// and http:// alike).
    """
    marker = '<script type="__bundler/template">'
    start = shell_html.find(marker)
    if start == -1:
        return shell_html
    nl = shell_html.find("\n", start + len(marker))
    if nl == -1:
        return shell_html
    j = nl + 1  # opening quote of the JSON literal line
    end = shell_html.find("\n  </script>", j)
    if end == -1:
        return shell_html
    chunk = shell_html[j:end]
    # JSON allows \\uXXXX for < — browser script tokenizer does not terminate on \\u003c
    escaped = re.sub(r"</script(\s*)>", r"\\u003c/script\1>", chunk, flags=re.IGNORECASE)
    return shell_html[:j] + escaped + shell_html[end:]


def _read_bytes_for(entry: dict) -> bytes:
    if "_parts" in entry:
        # Each split file already carries its own trailing newline (when present
        # in the original); concat without an inserted separator preserves the
        # exact byte stream the babel script had before splitting.
        return b"".join((SRC / part).read_bytes() for part in entry["_parts"])
    return (SRC / entry["_name"]).read_bytes()


def build(out_path: Path) -> None:
    template_manifest = json.loads(
        (BUILD / "manifest.template.json").read_text(encoding="utf-8")
    )
    shell = escape_bundler_template_end_tags(
        (BUILD / "shell.html").read_text(encoding="utf-8")
    )

    out_manifest: dict[str, dict] = {}
    for uuid, entry in template_manifest.items():
        raw = _read_bytes_for(entry)
        if entry.get("compressed"):
            # mtime=0 keeps the gzip output deterministic across builds
            payload = gzip.compress(raw, compresslevel=9, mtime=0)
        else:
            payload = raw
        out_manifest[uuid] = {
            "data": base64.b64encode(payload).decode("ascii"),
            "mime": entry["mime"],
            "compressed": bool(entry.get("compressed", False)),
        }

    # ext_resources block is empty in the original; keep it that way unless
    # someone explicitly adds it.
    manifest_json = json.dumps(out_manifest, separators=(",", ":"))
    out_html = shell.replace("__MANIFEST__", manifest_json)
    out_path.write_text(out_html, encoding="utf-8")
    sz = out_path.stat().st_size
    print(f"built: {out_path.name}  ({sz:,} bytes)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="Holy_Book_v3_46.html")
    args = ap.parse_args()

    build(ROOT / args.out)


if __name__ == "__main__":
    main()
