import clip
import torch
from PIL import Image

class ClipFilter:
    def __init__(self, model_name="ViT-B/32"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Loading CLIP model on {self.device}...")
        self.model, self.preprocess = clip.load(model_name, device=self.device)
        
    def filter_tags(self, image: Image.Image, tags: list, threshold: float = 0.25) -> list:
        """
        Filter tags based on visual similarity to the image using CLIP.
        """
        if not tags:
            return []
            
        # Preprocess image
        image_input = self.preprocess(image).unsqueeze(0).to(self.device)
        
        # Tokenize text
        # CLIP handles max 77 tokens, usually tags are short enough.
        # If we have issues, we might need to truncate or handle exceptions.
        text_tokens = clip.tokenize(tags).to(self.device)
        
        with torch.no_grad():
            image_features = self.model.encode_image(image_input)
            text_features = self.model.encode_text(text_tokens)
            
        # Normalize and compute cosine similarity
        image_features /= image_features.norm(dim=-1, keepdim=True)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        similarity = (image_features @ text_features.T).squeeze(0)
        
        filtered_tags = [tag for tag, score in zip(tags, similarity) if score.item() >= threshold]
        return filtered_tags
