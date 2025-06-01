from fastapi import APIRouter, Query
from backend.app.models import TextRequest
from backend.app.services.book_service import fetch_books
from backend.app.services.vocabulary_service import analyze_vocabulary_level
import logging

router = APIRouter()
logging.basicConfig(level=logging.INFO)

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

@router.get("/search")
def search_books(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=40)
):
    result, status = fetch_books(query, page, page_size)
    if status != 200:
        return {"error": "Failed to fetch books", "status_code": status}
    return result
