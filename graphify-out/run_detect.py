import json
from pathlib import Path

from graphify.detect import detect

result = detect(Path("."))
Path("graphify-out/.graphify_detect.json").write_text(
    json.dumps(result, ensure_ascii=False), encoding="utf-8"
)
print(f"TOTAL_FILES={result.get('total_files', 0)}")
print(f"TOTAL_WORDS={result.get('total_words', 0)}")
for category in ("code", "document", "paper", "image", "video"):
    print(f"{category.upper()}={len(result.get('files', {}).get(category, []))}")
print(f"SKIPPED_SENSITIVE={len(result.get('skipped_sensitive', []))}")
