import React from "react";

function SearchResults({ books }) {
  return (
    <div>
      {books.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <h3>{book.title}</h3>
              <p>Author: {book.authors?.join(", ") || "Unknown"}</p>
              <img src={book.thumbnail} alt={book.title} />
              <p>{book.description}</p>
              <a
                href={book.preview_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                More Info
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
