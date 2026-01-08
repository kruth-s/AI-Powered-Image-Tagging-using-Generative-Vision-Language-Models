import argparse
from utils.image_loader import load_image
from models.blip_captioner import BlipCaptioner
from models.keyword_extractor import KeywordExtractor
from models.clip_filter import ClipFilter

def main():
    parser = argparse.ArgumentParser(description="AI Powered Image Tagging")
    parser.add_argument("image_path", type=str, help="Path or URL to the image")
    parser.add_argument("--threshold", type=float, default=0.25, help="CLIP similarity threshold (default: 0.25)")
    args = parser.parse_args()

    # Load Image
    print(f"Loading image from {args.image_path}...")
    try:
        image = load_image(args.image_path)
    except Exception as e:
        print("Failed to load image. Exiting.")
        return

    # Initialize Models
    print("\n--- Initializing Models ---")
    blip = BlipCaptioner()
    keybert = KeywordExtractor()
    clip_filter = ClipFilter()

    # 1. Generate Caption
    print("\n--- Step 1: Captioning ---")
    caption = blip.generate_caption(image)
    print(f"Generated Caption: {caption}")

    # 2. Extract Keywords
    print("\n--- Step 2: Keyword Extraction ---")
    tags = keybert.extract_keywords(caption)
    print(f"Extracted Tags (KeyBERT): {tags}")

    # 3. Filter Tags with CLIP
    print("\n--- Step 3: Filtering Tags ---")
    final_tags = clip_filter.filter_tags(image, tags, threshold=args.threshold)
    print(f"Final Visually Relevant Tags (CLIP): {final_tags}")

if __name__ == "__main__":
    main()
