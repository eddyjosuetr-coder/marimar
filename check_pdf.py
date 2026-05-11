import fitz
import os

pdf_path = 'CATÁLOGO MARIMAR.pdf'
doc = fitz.open(pdf_path)

print("Page 1 text:")
print(doc[0].get_text())

print("Page 2 text:")
print(doc[1].get_text())

total_images = 0
for i in range(min(5, len(doc))):
    images = doc[i].get_images(full=True)
    total_images += len(images)
    print(f"Page {i+1} images: {len(images)}")
    
print(f"Total images in first 5 pages: {total_images}")
