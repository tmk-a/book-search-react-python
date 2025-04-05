import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <div className="p-4">Loading...</div>;

  const info = book.volumeInfo;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{info.title}</h1>
      <p className="text-gray-600">{info.authors?.join(", ")}</p>
      {info.imageLinks?.thumbnail && (
        <img
          src={info.imageLinks.thumbnail}
          alt={info.title}
          className="my-4"
        />
      )}
      <p
        dangerouslySetInnerHTML={{
          __html: info.description || "No description",
        }}
      />
    </div>
  );
}
