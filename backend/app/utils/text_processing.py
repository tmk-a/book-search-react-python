import nltk
from nltk.tokenize import word_tokenize
import os

# Define the path relative to the project
NLTK_DATA_PATH = os.path.join(os.path.dirname(__file__), "nltk_data")

# Append the custom nltk_data path
nltk.data.path.append(NLTK_DATA_PATH)

# nltk.download("punkt")
# Check if 'punkt' is installed; if not, download it
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    print("Downloading 'punkt' to:", NLTK_DATA_PATH)
    nltk.download("punkt", download_dir=NLTK_DATA_PATH)

def preprocess_text(text):
    """ Tokenize text, remove punctuation, and convert to lowercase. """
    if not text:
        return []
    text = text.lower()
    words = [word for word in word_tokenize(text) if word.isalpha()]
    return words
