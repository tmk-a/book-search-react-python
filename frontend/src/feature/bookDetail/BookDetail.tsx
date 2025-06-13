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
  const BASE_CLASS = "book-detail";

  return (
    <div className={`${BASE_CLASS}`}>
      <button className={`${BASE_CLASS}__back`} onClick={onBack}>
        ← Back
      </button>
      <div className={`${BASE_CLASS}__container`}>
        <img
          src={image}
          alt={`Cover of ${title}`}
          className={`${BASE_CLASS}__image`}
        />
        <div className={`${BASE_CLASS}__info`}>
          <h1 className={`${BASE_CLASS}__title`}>{title}</h1>
          <p className={`${BASE_CLASS}__author`}>by {author}</p>
          <p className={`${BASE_CLASS}__meta`}>
            {publisher && <span>{publisher}</span>}
            {publishedDate && <span>・{publishedDate}</span>}
            {pageCount && <span>・{pageCount} pages</span>}
          </p>
          {description && (
            <p className={`${BASE_CLASS}__desc`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
