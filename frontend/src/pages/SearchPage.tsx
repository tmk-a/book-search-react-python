import "./SearchPage.scss";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../service/api";
import BookCard from "../feature/bookCard/BookCard";
import { BookHeader } from "../util/typeUtil";
import { SearchInput } from "../core/components/input/SearchInput";
import { SearchFormValues } from "../util/typeUtil";
import FadeLoader from "react-spinners/FadeLoader";

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

  const lastSearchRef = useRef<SearchFormValues>({
    title: "",
    author: "",
    publisher: "",
    subject: "",
    keyword: "",
  });
  const [books, setBooks] = useState<BookHeader[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loading = isInitialLoading || isLoadingMore;
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isResultLimited, setIsResultLimited] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const pageSize = 10;
  const inputItems = [
    { id: 1, name: "title", value: title, fn: setTitle },
    { id: 2, name: "author", value: author, fn: setAuthor },
    { id: 3, name: "publisher", value: publisher, fn: setPublisher },
    { id: 4, name: "subject", value: subject, fn: setSubject },
  ];

  // Performs a search based on the given parameters and updates the book list.
  // Handles both initial search and loading more results (pagination).
  const performSearch = async (params: SearchFormValues, pageNum = 1) => {
    if (pageNum === 1) {
      setIsInitialLoading(true);
      setIsLoadingMore(false);
    } else {
      setIsInitialLoading(false);
      setIsLoadingMore(true);
    }
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
      if (pageNum === 1) {
        setIsInitialLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  // Called when the user submits the search form.
  // Filters out empty values, updates URL params, and performs the search.
  const handleSearch = () => {
    if (!keyword && !title && !author && !publisher && !subject) return;

    const params = { title, author, publisher, subject, keyword };

    setSearchParams(
      Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ""))
    );

    lastSearchRef.current = params;
    performSearch(params, 1);
  };

  // On initial render, if there are search parameters in the URL,
  // populate the form fields and perform the search.
  useEffect(() => {
    const params: SearchFormValues = {
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

  // Set up IntersectionObserver for infinite scroll.
  // When the #sentinel element becomes visible, load the next page.
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    const target = document.querySelector("#sentinel");
    if (target) observer.current.observe(target);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoadingMore, hasMore]);

  // When the page number changes (due to scroll),
  // fetch and append the next set of results.
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
          {isInitialLoading ? (
            <div className="spinner">
              <FadeLoader
                height={20}
                margin={5}
                radius={5}
                width={5}
                color="#6c8e7d"
              />
            </div>
          ) : books.length > 0 ? (
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

          {isLoadingMore && (
            <div className="spinner">
              <FadeLoader
                height={20}
                margin={5}
                radius={5}
                width={5}
                color="#6c8e7d"
              />
            </div>
          )}
          <div id="sentinel" style={{ height: "1px" }} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
