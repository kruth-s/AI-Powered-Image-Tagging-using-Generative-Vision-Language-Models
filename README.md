# AI Powered Image Tagging

This project uses Generative & Vision-Language Models (BLIP, KeyBERT, CLIP) to automatically tag images. It includes both a Python CLI and a modern React Frontend.

## Features
1. **Image Captioning**: Uses BLIP to generate a descriptive caption for the image.
2. **Keyword Extraction**: Uses KeyBERT to extract relevant keywords from the caption.
3. **Tag Filtering**: Uses CLIP to filter tags ensuring they are visually relevant to the image.

## Installation

### Backend Setup

1. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *Note: This might take a while as it downloads large model files.*

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Web Application (Recommended)

1. **Start the Backend Server**:
   ```bash
   python app.py
   ```
   The backend will start on `http://localhost:8000`.

2. **Start the Frontend**:
   ```bash
   npm run dev
   ```
   The frontend will be available at the URL shown in the terminal (usually `http://localhost:5173`).

### Running the CLI

Run the `main.py` script with an image path or URL:

```bash
python main.py path/to/image.jpg
```

**Optional Arguments:**
- `--threshold`: Set the CLIP similarity threshold (default: 0.25).

## Project Structure
- `app.py`: FastAPI backend server.
- `App.tsx`: React frontend entry component.
- `main.py`: CLI entry point script.
- `models/`: Contains the model wrapper classes (BLIP, KeyBERT, CLIP).
- `services/`: Frontend API services.
- `utils/`: Utility functions.
- `requirements.txt`: Python dependencies.
