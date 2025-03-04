import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { searchBooks } from "../services/api";

function HomePage() {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchBooks(query);
    setBooks(results);
  };

  return (
    <div>
      <h1>Book Search</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults books={books} />
    </div>
  );
}

export default HomePage;
