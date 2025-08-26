import { BookHeader } from "../../../util/typeUtil";
import BookCard from "../../../features/bookCard/BookCard";
import LoadingSpinner from "../../../core/components/loading/LoadingSpinner";
import "./SearchResultSection.scss";

type Props = {
  books: BookHeader[];
  totalItems: number;
  error: string | null;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isResultLimited: boolean;
  queryString?: string;
};

const BASE_CLASS = "search-result";

export default function SearchResultSection({
  books,
  totalItems,
  error,
  isInitialLoading,
  isLoadingMore,
  isResultLimited,
  queryString,
}: Props) {
  return (
    <div className={`${BASE_CLASS}__container`}>
      <p className={`${BASE_CLASS}__count`}>{totalItems} results</p>
      {error && <div>{error}</div>}
      {isResultLimited && (
        <p>
          Note: Only the first 1000 results can be accessed due to API limits.
        </p>
      )}

      <div className={`${BASE_CLASS}__books-container`}>
        {isInitialLoading ? (
          <LoadingSpinner />
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              queryString={queryString ? `?${queryString}` : ""}
            />
          ))
        ) : (
          <p>No books found</p>
        )}

        {isLoadingMore && <LoadingSpinner />}
        <div id="sentinel" style={{ height: "1px" }} />
      </div>
    </div>
  );
}
