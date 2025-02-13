import nltk
import os
from nltk.tokenize import word_tokenize

# make `nltk_data` folder and save
nltk_data_path = os.path.join(os.getcwd(), "nltk_data")
if not os.path.exists(nltk_data_path):
    os.makedirs(nltk_data_path)

# add data path
nltk.data.path.append(nltk_data_path)

# check if punkt was downloaded
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', download_dir=nltk_data_path)

def analyze_vocabulary_level(text: str) -> str:
    """Determine vocabulary level based on the given text."""
    try:
        words = word_tokenize(text.lower())  # Tokenize words
        unique_words = set(words)

        # (Example) Simple logic: Shorter = Beginner, Longer = Advanced
        if len(unique_words) < 10:
            return "beginner"
        elif len(unique_words) < 20:
            return "intermediate"
        else:
            return "advanced"
    except Exception as e:
        print(f"Error in vocabulary processing: {e}")
        return "error"
