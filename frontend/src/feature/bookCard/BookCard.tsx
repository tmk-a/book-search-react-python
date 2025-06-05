import "./BookCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookHeader } from "../../util/typeUtil";
import React from "react";

interface BookCardProps {
  book: BookHeader;
  queryString?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, queryString }) => {
  let outline = book.description;
  if (outline.length > 100) {
    outline = outline.substr(0, 100);
    outline += "...";
  }

  const linkTo = {
    pathname: `/book/${book.id}`,
    search: queryString,
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <Link to={linkTo}>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <div className="bookCard">
            <img
              src={book.thumbnail ?? null}
              alt={book.title}
              className="bookCard__image"
              style={{ opacity: isHovering ? "0" : "1" }}
            />
            <div
              className="bookCard bookCard__info"
              style={{
                opacity: isHovering ? "1" : "0",
              }}
            >
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
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
