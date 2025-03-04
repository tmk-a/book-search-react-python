from fastapi import FastAPI
from backend.app.routes import books
from fastapi.middleware.cors import CORSMiddleware #開発用

app = FastAPI()

# すべてのオリジンを許可（開発用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可（GET, POST, PUT, DELETE）
    allow_headers=["*"],  # すべてのヘッダーを許可
)

# Include the routes for books
app.include_router(books.router)

@app.get("/")
def home():
    return {"message": "Book Search API is running!"}
