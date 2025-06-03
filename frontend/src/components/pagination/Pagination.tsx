// src/components/Pagination.tsx
import React from "react";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="pagination__container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`pagination__button ${
            number === currentPage ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
