from fastapi import FastAPI
from backend.app.routes import books
from fastapi.middleware.cors import CORSMiddleware #TODO: for development

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)