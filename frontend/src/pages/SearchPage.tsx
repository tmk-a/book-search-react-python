import "./SearchPage.scss";
import { useState, useRef } from "react";
import { fetchBooks } from "../service/api";
import BookCard from "../feature/BookCard";
import { Pagination } from "../components/Pagination";
import bgImage from "../assets/images/search-background.jpg";

type Book = {
  id: string;
  title: string;
  description: string;
  published_date: string;
  thumbnail: string;
  preview_link: string;
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const lastSearchRef = useRef<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 20;

  const performSearch = async (searchQuery: string, pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(searchQuery, pageNum);
      setBooks(data.results || []);
      setTotalItems(data.total_items || 0);
      setPage(data.current_page);
    } catch (err) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query) return;
    lastSearchRef.current = query;
    performSearch(query, 1);
  };

  return (
    <div
      className="contents-container"
      style={{ "--bg-url": `url(${bgImage})` } as React.CSSProperties}
    >
      <div className="search-container">
        <h1>What do you want to read?</h1>
        <div className="search-container__input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a book..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
      {error && <div>{error}</div>}
      <p>hit: {totalItems}</p>
      <div className="search-result-container">
        {books.length > 0 ? (
          books.map((book: any) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No books found</p>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={(newPage) =>
          performSearch(lastSearchRef.current, newPage)
        }
      />
    </div>
  );
};

export default SearchPage;
