AI-Powered Image Tagging using Generative & Vision-Language Models

This project demonstrates an AI-based pipeline for automated image tagging using state-of-the-art generative and vision-language models. It leverages BLIP for caption generation, KeyBERT for keyword extraction, and CLIP for filtering visually relevant tags.

Features
Generate descriptive captions using BLIP

Extract keywords from captions using KeyBERT

Validate visual relevance using CLIP

Fully zero-shot — no training required

Works with local image uploads or image URLs

Tech Stack
BLIP (Salesforce) – Image Captioning

KeyBERT – Keyword Extraction

CLIP (OpenAI) – Image-Text Similarity

PyTorch, Transformers, Sentence-Transformers

Project Structure

├── AI_Image_Tagger.ipynb     # Main Colab Notebook
├── README.md                 # Project Documentation
└── examples/                 # Example images and results
Installation (for local development)

pip install transformers==4.30.2
pip install git+https://github.com/openai/CLIP.git
pip install keybert
pip install sentence-transformers
pip install timm
pip install torchvision

How It Works
Load Image – Upload or fetch image from URL

Caption Generation – BLIP generates a natural language description

Keyword Extraction – KeyBERT extracts keyphrases from the caption

Tag Filtering – CLIP filters tags based on image-text similarity

Output – Final tags reflect visually relevant concepts

Example
Caption: A red sports car driving on a coastal road.
Initial Tags: ['sports car', 'coastal road', 'red car']
Final Tags: ['sports car', 'red car']

References
BLIP on HuggingFace

KeyBERT GitHub

CLIP GitHub

License
This project is for educational purposes under fair use of open-source models.
