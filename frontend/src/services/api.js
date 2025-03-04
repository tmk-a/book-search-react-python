import axios from "axios";

export const searchBooks = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(`http://127.0.0.1:8000/search?q=${query}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
