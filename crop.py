from PIL import Image

def crop_transparent(image_path):
    try:
        im = Image.open(image_path)
        if im.mode != 'RGBA':
            im = im.convert('RGBA')
        
        # Get the bounding box of the non-transparent regions
        bbox = im.getbbox()
        if bbox:
            cropped = im.crop(bbox)
            cropped.save(image_path)
            print(f"Cropped {image_path}")
        else:
            print(f"Image {image_path} is completely transparent or couldn't get bbox.")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    crop_transparent("public/bbq/BBQ-Hot-Fritz-12x930g-caja.png")
