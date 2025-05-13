import "./SearchPage.css";
import { useState } from "react";
import { fetchBooks } from "../core/api";
import BookCard from "../feature/BookCard";

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
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

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
