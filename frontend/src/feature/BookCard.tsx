// src/feature/BookCard.tsx

// import React from "react";

const BookCard = ({ book }: { book: any }) => {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.authors?.join(", ")}</p>
      <img
        src={book.thumbnail}
        alt={book.title}
        style={{ maxWidth: "100px" }}
      />
    </div>
  );
};

export default BookCard;
