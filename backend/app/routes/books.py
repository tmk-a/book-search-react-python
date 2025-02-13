from fastapi import APIRouter
from backend.app.models import TextRequest
from backend.app.services.book_service import fetch_books
from backend.app.services.vocabulary_service import analyze_vocabulary_level
import logging

router = APIRouter()
logging.basicConfig(level=logging.INFO)

@router.get("/search")
def search_books(q: str):
    """Search books via Google Books API."""
    return fetch_books(q)

@router.post("/vocabulary-level")
def get_vocabulary_level(request: TextRequest):
    """API endpoint to analyze vocabulary level of a given text."""
    logging.info(f"Received request: {request.text}")
    try:
        level = analyze_vocabulary_level(request.text)
        return {"vocabulary_level": level}
    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return {"error": "Internal Server Error"}
