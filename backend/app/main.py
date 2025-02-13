from fastapi import FastAPI
from backend.app.routes import books

app = FastAPI()

# Include the routes for books
app.include_router(books.router)

@app.get("/")
def home():
    return {"message": "Book Search API is running!"}
