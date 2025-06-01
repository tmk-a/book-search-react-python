const API_BASE_URL = "https://book-search-react-python.onrender.com";

export const fetchBooks = async (query: string, pageNum = 1, pageSize = 20) => {
  const res = await fetch(
    `${API_BASE_URL}/search?query=${query}&page=${pageNum}&page_size=${pageSize}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await res.json();
  return data;
};
