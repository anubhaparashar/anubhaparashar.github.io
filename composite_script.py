from PIL import Image
from rembg import remove
import io

BASE = r"C:\Users\Anubha\Documents\GitHub\anubhaparashar.github.io\img\blog\academic\1. Conferences and ppt\ICICV"

# Load images
group_img = Image.open(f"{BASE}\\IMG20200118170533.jpg").convert("RGBA")
solo_img  = Image.open(f"{BASE}\\IMG20200118141657.jpg")

print("Removing background from solo image...")
with open(f"{BASE}\\IMG20200118141657.jpg", "rb") as f:
    solo_nobg_bytes = remove(f.read())
solo_nobg = Image.open(io.BytesIO(solo_nobg_bytes)).convert("RGBA")
print("Background removed.")

# Crop to bounding box of non-transparent pixels
bbox = solo_nobg.getbbox()
print(f"Solo person bbox: {bbox}")
solo_cropped = solo_nobg.crop(bbox)

# --- Target region: leftmost person in group photo (4608x3456) ---
# She stands at far left; estimated region based on visual inspection
target_x1, target_y1 = 30,  820
target_x2, target_y2 = 950, 3430
target_w = target_x2 - target_x1   # ~920
target_h = target_y2 - target_y1   # ~2610

# Scale solo person to match target height, keep aspect ratio
solo_w, solo_h = solo_cropped.size
scale = target_h / solo_h
new_w = int(solo_w * scale)
new_h = target_h
solo_scaled = solo_cropped.resize((new_w, new_h), Image.LANCZOS)

# Centre horizontally within target_x region
paste_x = target_x1 + (target_w - new_w) // 2
paste_y = target_y1

print(f"Pasting solo at ({paste_x}, {paste_y}), size {solo_scaled.size}")

# Paste solo person over group image using her alpha as mask
group_img.paste(solo_scaled, (paste_x, paste_y), solo_scaled)

# Save result
out_path = f"{BASE}\\IMG20200118170533.jpg"
group_img.convert("RGB").save(out_path, "JPEG", quality=95)
print(f"Saved to {out_path}")
