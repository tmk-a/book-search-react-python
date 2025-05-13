import requests

GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"

def fetch_books(query: str, max_results: int = 1000):
    """Fetch books from Google Books API based on the query."""
    books = []
    fetched = 0
    max_per_request = 40

    while fetched < max_results:
        params = {
            "q": query,
            "maxResults": min(max_per_request, max_results - fetched),
            "startIndex": fetched
        }
        response = requests.get(GOOGLE_BOOKS_API, params=params)
        
        if response.status_code != 200:
            return {"error": "Failed to fetch books", "status_code": response.status_code}
        
        data = response.json()
        items = data.get("items", [])
        if not items:
            break

        for item in items:
            volume_info = item.get("volumeInfo", {})
            book_details = {
                "id": item.get("id"),
                "title": volume_info.get("title"),
                "authors": volume_info.get("authors", []),
                "description": volume_info.get("description", "No description available"),
                "published_date": volume_info.get("publishedDate", "Unknown"),
                "thumbnail": volume_info.get("imageLinks", {}).get("thumbnail", ""),
                "preview_link": volume_info.get("previewLink", "")
            }
            books.append(book_details)

        fetched += len(items)

    return {"results": books}
