import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookVolume } from "../util/typeUtil";
import { fetchBookDetail } from "../service/api";
import BookDetail from "../features/bookDetail/BookDetail";

const BookDetailPage = () => {
  const { id } = useParams<string>();
  const [book, setBook] = useState<BookVolume>();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = location.search;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await fetchBookDetail(id ?? "");
        setBook(data);
      } catch (err) {
        setError("Failed to load book data.");
      }
    };

    fetchBook();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  const info = book.volumeInfo;

  return (
    <BookDetail
      title={info.title}
      author={info.authors?.join(", ")}
      image={info.imageLinks?.thumbnail ?? ""}
      description={info.description}
      publisher={info.publisher}
      publishedDate={info.publishedDate}
      pageCount={info.pageCount}
      onBack={() => navigate(`/${queryString}`)}
    />
  );
};

export default BookDetailPage;
