import fitz
import os

pdf_path = 'CATÁLOGO MARIMAR.pdf'
output_dir = 'public/extracted'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Extract first 20 pages as PNGs (thumbnails)
for i in range(20):
    page = doc[i]
    pix = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5)) # 50% scale
    pix.save(f"{output_dir}/page_{i+1}.png")
    
print("Saved 20 thumbnails")
