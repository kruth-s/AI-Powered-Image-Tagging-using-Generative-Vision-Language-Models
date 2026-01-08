from PIL import Image
import requests
from io import BytesIO
import os

def load_image(image_source: str) -> Image.Image:
    """
    Load an image from a local path or a URL.
    
    Args:
        image_source (str): File path or URL of the image.
        
    Returns:
        Image.Image: Loaded PIL Image in RGB format.
    """
    try:
        if image_source.startswith("http://") or image_source.startswith("https://"):
            response = requests.get(image_source)
            response.raise_for_status()
            image = Image.open(BytesIO(response.content)).convert("RGB")
        elif os.path.exists(image_source):
            image = Image.open(image_source).convert("RGB")
        else:
            raise FileNotFoundError(f"Image not found at: {image_source}")
        
        return image
    except Exception as e:
        print(f"Error loading image: {e}")
        raise
