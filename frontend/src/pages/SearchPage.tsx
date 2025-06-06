import "./SearchPage.scss";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../service/api";
import BookCard from "../feature/bookCard/BookCard";
import { Pagination } from "../core/components/pagination/Pagination";
import { BookHeader } from "../util/typeUtil";
import { SearchInput } from "../core/components/input/SearchInput";
import { SearchInputT } from "../util/typeUtil";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [author, setAuthor] = useState(searchParams.get("author") || "");
  const [publisher, setPublisher] = useState(
    searchParams.get("publisher") || ""
  );
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const queryString = searchParams.toString();

  const lastSearchRef = useRef<SearchInputT>({
    title: "",
    author: "",
    publisher: "",
    subject: "",
    keyword: "",
  });
  const [books, setBooks] = useState<BookHeader[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isResultLimited, setIsResultLimited] = useState(false);

  const pageSize = 20;
  const inputItems = [
    { name: "title", value: title, fn: setTitle },
    { name: "author", value: author, fn: setAuthor },
    { name: "publisher", value: publisher, fn: setPublisher },
    { name: "subject", value: subject, fn: setSubject },
    { name: "keyword", value: keyword, fn: setKeyword },
  ];

  const performSearch = async (params: SearchInputT, pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(params, pageNum, pageSize);
      setBooks(data.results || []);
      setTotalItems(data.total_items || 0);
      setPage(data.current_page);
      setIsResultLimited((data.total_items || 0) > 1000);
    } catch (err) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!keyword && !title && !author && !publisher && !subject) return;

    const params = { title, author, publisher, subject, keyword };

    setSearchParams(
      Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ""))
    );

    lastSearchRef.current = params;
    performSearch(params, 1);
  };

  useEffect(() => {
    const params: SearchInputT = {
      title: searchParams.get("title") || "",
      author: searchParams.get("author") || "",
      publisher: searchParams.get("publisher") || "",
      subject: searchParams.get("subject") || "",
      keyword: searchParams.get("keyword") || "",
    };

    const hasParams = Object.values(params).some((v) => v !== "");

    if (hasParams) {
      setTitle(params.title);
      setAuthor(params.author);
      setPublisher(params.publisher);
      setSubject(params.subject);
      setKeyword(params.keyword);
      performSearch(params, 1);
    }
  }, []);

  return (
    <div className="contents-container">
      <div className="search-container">
        <h1>What do you want to read?</h1>
        <div className="search-container__input">
          {inputItems.map((input) => (
            <div className="search-container__input-item">
              <label>{input.name}</label>
              <SearchInput
                query={input.value}
                onChange={(e) => input.fn(e.target.value)}
                name={input.name}
              />
            </div>
          ))}
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
      <div className="search-result__container">
        {error && <div>{error}</div>}
        <p className="search-result__count">hit: {totalItems}</p>
        {isResultLimited && (
          <p>
            Note: Only the first 1000 results can be accessed due to API limits.
          </p>
        )}
        <div className="search-result__books-container">
          {books.length > 0 ? (
            books.map((book: BookHeader) => (
              <BookCard
                book={book}
                queryString={queryString ? `?${queryString}` : ""}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
        <Pagination
          currentPage={page}
          totalPages={isResultLimited ? 50 : Math.ceil(totalItems / pageSize)}
          onPageChange={(newPage) =>
            performSearch(lastSearchRef.current, newPage)
          }
        />
      </div>
    </div>
  );
};

export default SearchPage;
