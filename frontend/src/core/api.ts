const API_BASE_URL = "https://book-search-react-python.onrender.com";

// Fetch books from backend
export const fetchBooks = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};
