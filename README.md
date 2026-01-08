# AI Powered Image Tagging

This project uses Generative & Vision-Language Models (BLIP, KeyBERT, CLIP) to automatically tag images.

## Features
1. **Image Captioning**: Uses BLIP to generate a descriptive caption for the image.
2. **Keyword Extraction**: Uses KeyBERT to extract relevant keywords from the caption.
3. **Tag Filtering**: Uses CLIP to filter tags ensuring they are visually relevant to the image.

## Installation

1. Clone the repository.
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *Note: This might take a while as it downloads large model files.*

## Usage

Run the `main.py` script with an image path or URL:

```bash
python main.py path/to/image.jpg
```

Or with a URL:

```bash
python main.py "https://example.com/image.jpg"
```

### Optional Arguments
- `--threshold`: Set the CLIP similarity threshold (default: 0.25).
  ```bash
  python main.py image.jpg --threshold 0.3
  ```

## Project Structure
- `main.py`: Entry point script.
- `models/`: Contains the model wrapper classes (BLIP, KeyBERT, CLIP).
- `utils/`: Utility functions (e.g., image loading).
- `requirements.txt`: Python dependencies.
