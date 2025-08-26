import "./SearchPage.scss";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../../service/api";
import { BookHeader } from "../../util/typeUtil";
import { SearchFormValues } from "../../util/typeUtil";
import AdvancedSearchModal from "../../features/advancedSearchModal/AdvancedSearchModal";
import SearchSection from "./components/SearchSection";
import SearchResultSection from "./components/SearchResultSection";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const pageSize = 10;

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
  const handleSearch = (overrideParams?: string | SearchFormValues) => {
    let effectiveParams: SearchFormValues;
    if (typeof overrideParams === "string") {
      effectiveParams = {
        title,
        author,
        publisher,
        subject,
        keyword: overrideParams,
      };
    } else {
      effectiveParams = overrideParams ?? {
        title,
        author,
        publisher,
        subject,
        keyword,
      };
    }

    if (
      !effectiveParams.keyword &&
      !effectiveParams.title &&
      !effectiveParams.author &&
      !effectiveParams.publisher &&
      !effectiveParams.subject
    )
      return;

    setSearchParams(
      Object.fromEntries(
        Object.entries(effectiveParams).filter(([_, v]) => v !== "")
      )
    );

    lastSearchRef.current = effectiveParams;
    performSearch(effectiveParams, 1);
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
      <SearchSection
        keyword={keyword}
        setKeyword={setKeyword}
        loading={loading}
        onSearch={() => handleSearch(keyword)}
        onOpenAdvanced={() => setIsModalOpen(true)}
      />
      <SearchResultSection
        books={books}
        totalItems={totalItems}
        error={error}
        isInitialLoading={isInitialLoading}
        isLoadingMore={isLoadingMore}
        isResultLimited={isResultLimited}
        queryString={queryString}
      />
      <AdvancedSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialParams={{
          title: searchParams.get("title") || "",
          author: searchParams.get("author") || "",
          publisher: searchParams.get("publisher") || "",
          subject: searchParams.get("subject") || "",
          keyword: searchParams.get("keyword") || "",
        }}
        onApply={(newParams: SearchFormValues) => {
          setSearchParams(newParams);
          setIsModalOpen(false);
          handleSearch(newParams);
        }}
      />
    </div>
  );
};

export default SearchPage;
