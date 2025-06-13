import "./SearchPage.scss";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../service/api";
import BookCard from "../feature/bookCard/BookCard";
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
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isResultLimited, setIsResultLimited] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const pageSize = 20;
  const inputItems = [
    { id: 1, name: "title", value: title, fn: setTitle },
    { id: 2, name: "author", value: author, fn: setAuthor },
    { id: 3, name: "publisher", value: publisher, fn: setPublisher },
    { id: 4, name: "subject", value: subject, fn: setSubject },
  ];

  const performSearch = async (params: SearchInputT, pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(params, pageNum, pageSize);
      if (pageNum === 1) {
        setBooks(data.items || []);
      } else {
        setBooks((prev) => [...prev, ...(data.items || [])]);
      }
      setTotalItems(data.total_items || 0);
      setIsResultLimited((data.total_items || 0) > 1000);
      setHasMore((data.items || []).length === pageSize);
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

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    const target = document.querySelector("#sentinel");
    if (target) observer.current.observe(target);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;

    const allFieldsAreEmpty = Object.values(lastSearchRef.current).every(
      (v) => v === ""
    );
    if (allFieldsAreEmpty) return;

    performSearch(lastSearchRef.current, page);
  }, [page]);

  return (
    <div className="contents-container">
      <div className="search-container">
        <h1>What do you want to read?</h1>
        <div className="search-container__input">
          <div className="search-container__input-item">
            <label>keyword</label>
            <SearchInput
              query={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              name={"keyword"}
            />
          </div>
          <div className="search-container__input-items">
            {inputItems.map((input) => (
              <div key={input.id} className="search-container__input-item">
                <label>{input.name}</label>
                <SearchInput
                  query={input.value}
                  onChange={(e) => input.fn(e.target.value)}
                  name={input.name}
                />
              </div>
            ))}
          </div>
          <div className="search-container__input-bottom">
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
      <div className="search-result__container">
        <p className="search-result__count">{totalItems} results</p>
        {error && <div>{error}</div>}
        {isResultLimited && (
          <p>
            Note: Only the first 1000 results can be accessed due to API limits.
          </p>
        )}
        <div className="search-result__books-container">
          {books.length > 0 ? (
            books.map((book: BookHeader) => (
              <BookCard
                key={book.id}
                book={book}
                queryString={queryString ? `?${queryString}` : ""}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
          <div id="sentinel" style={{ height: "1px" }} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
