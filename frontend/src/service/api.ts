import { SearchFormValues } from "../util/typeUtil";
const API_BASE_URL = "https://book-search-react-python.onrender.com";

export const fetchBooks = async (
  { title, author, publisher, subject, keyword }: SearchFormValues,
  pageNum = 1,
  pageSize = 10
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

export const fetchBookDetail = async (bookId: string) => {
  const res = await fetch(`${API_BASE_URL}/books/${bookId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch book detail data");
  }
  const data = await res.json();
  return data;
};
