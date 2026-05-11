import fitz  # PyMuPDF
import os
from PIL import Image
import io

pdf_path = 'CATÁLOGO MARIMAR.pdf'
output_dir = 'public/extracted'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

aderezos_keywords = ["aderezo", "salsa", "cheddar", "tocineta", "maíz", "guasacaca", "picante"]

count = 0
for i in range(len(doc)):
    page = doc[i]
    text = page.get_text().lower()
    
    # Check if page might contain Aderezos
    is_aderezos = any(k in text for k in aderezos_keywords)
    
    if is_aderezos:
        print(f"Page {i+1} might contain aderezos.")
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list, start=1):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            try:
                img_obj = Image.open(io.BytesIO(image_bytes))
                # Skip tiny icons or massive backgrounds
                if img_obj.width < 100 or img_obj.height < 100:
                    continue
                if img_obj.width > 3000 or img_obj.height > 3000:
                    continue
                    
                filename = f"{output_dir}/page_{i+1}_img_{img_index}.{image_ext}"
                img_obj.save(filename)
                count += 1
            except Exception as e:
                print(f"Error saving image: {e}")
                
print(f"Extracted {count} images from pages containing aderezos.")
