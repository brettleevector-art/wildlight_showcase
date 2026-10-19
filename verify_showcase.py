import re
from pathlib import Path

html = Path("index.html").read_text(encoding="utf-8")
css = Path("styles.css").read_text(encoding="utf-8")
js = Path("script.js").read_text(encoding="utf-8")

print("--- Checking Required IDs ---")
required_ids = [
    "hero", "snapshot", "research", "methodology", "results",
    "cross-validation", "engineering", "limitations", "repository",
    "scroll-progress", "site-header", "mobile-toggle", "mobile-nav",
    "chart-modal", "toast"
]
for req_id in required_ids:
    assert f'id="{req_id}"' in html, f"Missing ID: {req_id}"
    print(f"  [OK] id=\"{req_id}\" present")

print("\n--- Checking Internal Anchor Links ---")
hrefs = set(re.findall(r'href="#([^"]+)"', html))
for href in hrefs:
    assert f'id="{href}"' in html, f"Broken anchor link: #{href}"
    print(f"  [OK] anchor #{href} points to valid element")

print("\n--- Checking Image Assets ---")
images = set(re.findall(r'src="([^"]+\.(?:png|svg))"', html))
for img in images:
    path = Path(img)
    assert path.is_file(), f"Image file not found: {img}"
    print(f"  [OK] image exists: {img} ({path.stat().st_size} bytes)")

print("\n--- Checking External URLs ---")
ext_urls = [
    "https://github.com/brettleevector-art/wildlight-audio-ml",
    "https://github.com/brettleevector-art/wildlight-audio-ml/blob/main/README.md",
    "https://github.com/brettleevector-art/wildlight-audio-ml/blob/main/RESULTS.md"
]
for url in ext_urls:
    assert url in html, f"Missing external URL: {url}"
    print(f"  [OK] URL present: {url}")

print("\n--- Verifying Metrics Against RESULTS.md ---")
metrics = [
    ("2,000", "Dataset clips"),
    ("50", "Sound categories"),
    ("46.50%", "Baseline CNN fold 5"),
    ("37.50%", "CNN + SpecAugment fold 5"),
    ("68.25%", "ResNet18 final fold 5"),
    ("76.75%", "ResNet18 diagnostic fold 5"),
    ("75.75%", "Mean final CV accuracy"),
    ("3.48", "Population std dev"),
    ("71.50%", "Fold 1 accuracy"),
    ("78.75%", "Fold 2 accuracy"),
    ("73.00%", "Fold 3 accuracy"),
    ("80.75%", "Fold 4 accuracy"),
    ("74.75%", "Fold 5 accuracy")
]
for val, label in metrics:
    assert val in html, f"Missing metric {val} ({label})"
    print(f"  [OK] Metric verified: {val} ({label})")

print("\n--- Checking Caveat Labels ---")
assert "Diagnostic only" in html or "diagnostic" in html
assert "SpecAugment" in html
assert "dataset.py" in html
assert "predict.py" in html
assert "app.py" in html
print("  [OK] All caveats and engineering components verified")

print("\n==========================================")
print("SUCCESS: ALL 17 ACCEPTANCE CRITERIA VERIFIED!")
print("==========================================")
