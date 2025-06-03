import requests

GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"

def fetch_books(title=None, author=None, publisher=None, subject=None, keyword=None, page=1, page_size=20):
    filters = []
    books = []
    
    if keyword:
        filters.append(keyword)
    if title:
        filters.append(f"intitle:{title}")
    if author:
        filters.append(f"inauthor:{author}")
    if publisher:
        filters.append(f"inpublisher:{publisher}")
    if subject:
        filters.append(f"subject:{subject}")

    query = "+".join(filters)
    start_index = (page - 1) * page_size
    params = {
        "q": query,
        "startIndex": start_index,
        "maxResults": page_size
    }

    response = requests.get(GOOGLE_BOOKS_API, params=params)
    if response.status_code != 200:
        return None, response.status_code

    data = response.json()
    items = data.get("items", [])
    total_items = data.get("totalItems", 0)

    if not items:
        return
    
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

    return {
        "results": books,
        "total_items": total_items,
        "current_page": page,
        "page_size": page_size
    }, 200


def get_book_detail(book_id: str):
    url = f"https://www.googleapis.com/books/v1/volumes/{book_id}"
    response = requests.get(url)

    if response.status_code != 200:
        return None, response.status_code

    return response.json(), 200

