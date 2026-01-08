from transformers import BlipProcessor, BlipForConditionalGeneration
import torch
from PIL import Image

class BlipCaptioner:
    def __init__(self, model_name="Salesforce/blip-image-captioning-base"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Loading BLIP model on {self.device}...")
        self.processor = BlipProcessor.from_pretrained(model_name)
        self.model = BlipForConditionalGeneration.from_pretrained(model_name).to(self.device)
        
    def generate_caption(self, image: Image.Image) -> str:
        """
        Generate a caption for the given image using BLIP.
        """
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        caption_ids = self.model.generate(**inputs)
        caption = self.processor.decode(caption_ids[0], skip_special_tokens=True)
        return caption
