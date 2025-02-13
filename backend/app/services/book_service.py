import requests

GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"

def fetch_books(query: str, max_results: int = 5):
    """Fetch books from Google Books API based on the query."""
    params = {"q": query, "maxResults": max_results}
    response = requests.get(GOOGLE_BOOKS_API, params=params)

    if response.status_code != 200:
        return {"error": "Failed to fetch books", "status_code": response.status_code}
    
    data = response.json()

    books = []
    for item in data.get("items", []):
        volume_info = item.get("volumeInfo", {})
        book_details = {
            "title": volume_info.get("title"),
            "authors": volume_info.get("authors", []),
            "description": volume_info.get("description", "No description available"),
            "published_date": volume_info.get("publishedDate", "Unknown"),
            "thumbnail": volume_info.get("imageLinks", {}).get("thumbnail", ""),
            "preview_link": volume_info.get("previewLink", "")
        }
        books.append(book_details)

    return {"results": books}

