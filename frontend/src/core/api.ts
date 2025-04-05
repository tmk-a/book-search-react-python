const API_BASE_URL = "http://localhost:8000";

// Fetch books from backend
export const fetchBooks = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};
