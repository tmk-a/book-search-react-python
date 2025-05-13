from fastapi import FastAPI
from backend.app.routes import books
from fastapi.middleware.cors import CORSMiddleware #開発用

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)

@app.get("/")
def home():
    return {"message": "Book Search API is running!"}
