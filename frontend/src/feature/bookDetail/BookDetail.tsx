import React from "react";
import "./BookDetail.scss";

interface BookDetailProps {
  title: string;
  author: string;
  image: string;
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  onBack?: () => void;
}
const BookDetail: React.FC<BookDetailProps> = ({
  title,
  author,
  image,
  description,
  publisher,
  publishedDate,
  pageCount,
  onBack,
}) => {
  return (
    <div className="book-detail">
      <button className="book-detail__back" onClick={onBack}>
        ← Back
      </button>
      <div className="book-detail__container">
        <img
          src={image}
          alt={`Cover of ${title}`}
          className="book-detail__image"
        />
        <div className="book-detail__info">
          <h1 className="book-detail__title">{title}</h1>
          <p className="book-detail__author">by {author}</p>
          <p className="book-detail__meta">
            {publisher && <span>{publisher}</span>}
            {publishedDate && <span>・{publishedDate}</span>}
            {pageCount && <span>・{pageCount} pages</span>}
          </p>
          {description && <p className="book-detail__desc">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
