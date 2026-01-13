from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import base64
from io import BytesIO
from PIL import Image
from models.blip_captioner import BlipCaptioner
from models.keyword_extractor import KeywordExtractor
from models.clip_filter import ClipFilter
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    image: str # Base64 string
    mimeType: str

blip = None
keybert = None
clip_filter = None

@app.on_event("startup")
async def load_models():
    global blip, keybert, clip_filter
    print("Loading models...")
    try:
        blip = BlipCaptioner()
        keybert = KeywordExtractor()
        clip_filter = ClipFilter()
        print("Models loaded successfully!")
    except Exception as e:
        print(f"Error loading models: {e}")

@app.post("/analyze")
async def analyze_image(request: ImageRequest):
    if not blip:
        raise HTTPException(status_code=503, detail="Models not initialized")

    try:
        # decode image
        # verify padding if needed, but standard base64 from JS usually fine.
        image_data = base64.b64decode(request.image)
        image = Image.open(BytesIO(image_data)).convert("RGB")

        # 1. Caption
        print("Generating caption...")
        caption = blip.generate_caption(image)
        
        # 2. Keywords
        print("Extracting keywords...")
        tags = keybert.extract_keywords(caption)
        
        # 3. Filter
        print("Filtering tags...")
        final_tags = clip_filter.filter_tags(image, tags, threshold=0.25)
        
        return {
            "caption": caption,
            "tags": final_tags
        }
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
