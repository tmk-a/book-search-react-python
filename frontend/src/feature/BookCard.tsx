// import React from "react";

import "./BookCard.css";

type book = {
  id: string;
  title: string;
  authors: string;
  description: string;
  published_date: string;
  thumbnail: string;
  preview_link: string;
};

const BookCard = ({ book }: { book: book }) => {
  let outline = book.description;
  if (outline.length > 100) {
    outline = outline.substr(0, 200);
    outline += "...";
  }

  return (
    <div className="bookCard">
      <div className="bookCard-img">
        <img
          src={book.thumbnail}
          alt={book.title}
          style={{ maxWidth: "100px" }}
        />
      </div>
      <div className="bookCard-header">
        <h3>{book.title}</h3>
      </div>
      <div className="bookCard-body">
        <p>{outline}</p>
      </div>
      <div className="bookCard-footer">
        <div className="bookCard-footer-item">
          <strong>{book.authors}</strong>
          <span className="muted">{book.published_date}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
