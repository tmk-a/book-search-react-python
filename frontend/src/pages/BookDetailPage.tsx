import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookVolume } from "../util/typeUtil";
import { BookDescription } from "../components/bookDescription/BookDescription";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookVolume>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await res.json();
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
    <div className="book-detail">
      <h1>{info.title}</h1>
      <p>Authors: {info.authors?.join(", ")}</p>
      <p>Published: {info.publishedDate}</p>
      <img src={info.imageLinks?.thumbnail} alt={info.title} />
      <BookDescription html={info.description || "No description available."} />
      <a href={info.previewLink} target="_blank" rel="noopener noreferrer">
        Preview
      </a>
    </div>
  );
};

export default BookDetailPage;
