import React from "react";

interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

interface PaginationProps {
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  if (!pagination || pagination.last_page <= 1) return null;
  const pages = [];
  for (let i = pagination.current_page; i <= pagination.last_page; i++) {
    pages.push(i);
  }
  return (
    <nav className="flex items-center justify-center space-x-2 mt-4">
      {pages.map((link, index) => {
        return (
          <button
            key={index}
            onClick={() => onPageChange(link)}
            // disabled={isDisabled}
            className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors cursor-pointer
              ${
                pagination.current_page === link
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {link}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
