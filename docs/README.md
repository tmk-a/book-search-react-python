# 📚 Book Search App

A simple full-stack application for exploring books from around the world.  
Built with React and FastAPI, this app fetches data from the Google Books API and allows users to search for titles, browse results, and view detailed information.

[🟢 Live Demo](https://book-search-react-python.vercel.app/)

---

## 🔍 Features

- Keyword-based book search using the Google Books API
- Paginated result display with responsive layout
- Clickable cards to view book details (author, publisher, description, etc.)

---

## 🛠 Tech Stack

**Frontend**

- React
- TypeScript
- SCSS (Modular)

**Backend**

- FastAPI
- Python

**API**

- Google Books API

**Deployment**

- Vercel (Frontend)
- Render (Backend)

---

## 🚧 Notes

This is a minimum viable product (MVP) and is currently under development.  
Future improvements may include:

- Modal for advanced search (author, language, publication year)
- Enhanced error handling
- Bookmark/favorite feature
- Improved UI transitions and animations

---

## 🧠 Developer's Note

While this app is a functional tool for book discovery, it also serves as an experiment in designing a user experience that feels like “choosing a story.”  
More than just a search interface, the goal is to offer an intuitive and emotionally engaging way to explore content.

---

## 📦 Getting Started

To run locally:

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
cd ..
source venv/bin/activate
uvicorn main:app --reload

```
