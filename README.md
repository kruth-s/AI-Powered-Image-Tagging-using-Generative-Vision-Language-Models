# AI-Powered Image Tagging using Generative & Vision-Language Models

This project demonstrates an AI-powered pipeline for **automated image tagging** using state-of-the-art generative and vision-language models. It leverages **BLIP** for image captioning, **KeyBERT** for keyword extraction, and **CLIP** for filtering visually relevant tags.

## Features

- Generate descriptive captions from raw images using BLIP
- Extract keywords from captions using KeyBERT
- Filter tags based on visual relevance using CLIP
- Fully zero-shot – works on unseen images without retraining
- Accepts both uploaded images and image URLs

## Tech Stack

- [BLIP (Salesforce)](https://huggingface.co/Salesforce/blip-image-captioning-base) – Vision-Language Captioning
- [KeyBERT](https://github.com/MaartenGr/KeyBERT) – Keyword Extraction with BERT embeddings
- [CLIP (OpenAI)](https://github.com/openai/CLIP) – Image-Text Similarity
- PyTorch, Hugging Face Transformers, Sentence-Transformers

## Project Structure

├── AI_Image_Tagger.ipynb # Main Google Colab notebook 
├── README.md # Project documentation 
└── examples/ # Sample images and results (optional)

## Installation (for local development)

pip install transformers==4.30.2
pip install git+https://github.com/openai/CLIP.git
pip install keybert
pip install sentence-transformers
pip install timm
pip install torchvision

How It Works

Load Image – Upload an image or provide an image URL.

Caption Generation (BLIP) – Generate a descriptive caption of the image.

Keyword Extraction (KeyBERT) – Extract meaningful keywords from the caption.

Tag Filtering (CLIP) – Filter out tags not visually relevant to the image.

Output – Display the caption and final tags.

Example Output
Caption: A red Audi concept car displayed on a futuristic showroom floor.
Initial Tags: ['audi concept', 'concept car', 'audi', 'car', 'concept']
Final Tags: ['audi concept', 'concept car', 'audi']

References
BLIP on Hugging Face

KeyBERT GitHub

CLIP GitHub

License
This project is for educational purposes only. All models used are open-source and licensed by their respective organizations.
