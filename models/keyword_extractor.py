from keybert import KeyBERT
from sentence_transformers import SentenceTransformer

class KeywordExtractor:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        print("Loading KeyBERT model...")
        self.sbert_model = SentenceTransformer(model_name)
        self.kw_model = KeyBERT(model=self.sbert_model)

    def extract_keywords(self, text: str, top_n: int = 5, ngram_range: tuple = (1, 2)) -> list:
        """
        Extract keywords from the given text.
        """
        keywords = self.kw_model.extract_keywords(text, keyphrase_ngram_range=ngram_range, stop_words='english', top_n=top_n)
        # keywords returns list of tuples (word, score)
        return [kw[0] for kw in keywords]
