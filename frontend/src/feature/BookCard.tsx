import "./BookCard.scss";
import { useState } from "react";

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
    outline = outline.substr(0, 100);
    outline += "...";
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
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
    </>
    // <div className="bookCard">
    //   <div className="bookCard-img">
    //     <img
    //       src={book.thumbnail}
    //       alt={book.title}
    //       style={{ maxWidth: "100%" }}
    //     />
    //   </div>
    //   <div className="bookCard-header">
    //     <h3>{book.title}</h3>
    //   </div>
    //   <div className="bookCard-body">
    //     <p>{outline}</p>
    //   </div>
    //   <div className="bookCard-footer">
    //     <div className="bookCard-footer-item">
    //       <strong>{book.authors}</strong>
    //       <span className="muted">{book.published_date}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BookCard;
