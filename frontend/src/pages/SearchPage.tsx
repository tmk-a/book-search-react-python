import "./SearchPage.scss";
import { useState } from "react";
import { fetchBooks } from "../core/api";
import BookCard from "../feature/BookCard";
import bgImage from "../assets/images/search-background.jpg";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(query);
      setBooks(data.results || []);
    } catch (err) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contants-container"
      style={{ "--bg-url": `url(${bgImage})` } as React.CSSProperties}
    >
      <div className="search-container">
        <h1>What do you want to read?</h1>
        <div>
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

      <div className="search-result-container">
        {books.length > 0 ? (
          books.map((book: any) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
