import { SearchInputT } from "../util/typeUtil";
const API_BASE_URL = "https://book-search-react-python.onrender.com";

export const fetchBooks = async (
  { title, author, publisher, subject, keyword }: SearchInputT,
  pageNum = 1,
  pageSize = 20
) => {
  const res = await fetch(
    `${API_BASE_URL}/search?title=${title}&author=${author}&publisher=${publisher}&subject=${subject}&keyword=${keyword}&page=${pageNum}&page_size=${pageSize}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await res.json();
  return data;
};
