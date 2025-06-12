import "./BookCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookHeader } from "../../util/typeUtil";
import React from "react";
import noCoverImg from "../../assets/images/no-image.png";

interface BookCardProps {
  book: BookHeader;
  queryString?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, queryString }) => {
  const linkTo = {
    pathname: `/book/${book.id}`,
    search: queryString,
  };

  const [isHovering, setIsHovering] = useState(false);

  const BASE_CLASS = "book-card";

  return (
    <>
      <Link to={linkTo}>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <div className={`${BASE_CLASS}`}>
            <div className={`${BASE_CLASS}__image-wrapper`}>
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className={`${BASE_CLASS}__image`}
                />
              ) : (
                <>
                  <img
                    src={noCoverImg}
                    alt="No cover"
                    className={`${BASE_CLASS}__image`}
                  />
                  <div className={`${BASE_CLASS}__title-overlay`}>
                    {book.title}
                  </div>
                </>
              )}
            </div>
            <div
              className={`${BASE_CLASS}__info`}
              style={{
                opacity: isHovering ? "1" : "0",
              }}
            >
              <h3 className={`${BASE_CLASS}__title`}>{book.title}</h3>
              <p className={`${BASE_CLASS}__author`}>
                {book.authors?.join(", ") || "Unknown author"}
              </p>
              <p className={`${BASE_CLASS}__desc`}>
                {book.description
                  ? book.description.slice(0, 100) + "..."
                  : "No description available"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
