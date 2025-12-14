import React from "react";

interface PaginationProps {
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
  };
  onActionChange: (pageData: {
    current_page: number;
    per_page: number;
  }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onActionChange,
}) => {
  const pages = [];
  for (let i = 1; i <= pagination.last_page; i++) {
    pages.push(i);
  }

  const perPageOptions = [10, 20, 30, 50, 100];

  return (
    <div className="flex items-center justify-center mt-4 p-4">
      {/* Per page dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={pagination.per_page}
          onChange={(e) =>
            onActionChange({
              current_page: 1,
              per_page: Number(e.target.value),
            })
          }
          className="border border-gray-300 py-1 px-2 rounded-md cursor-pointer"
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Page buttons */}
      <nav className="flex items-center space-x-2">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              onActionChange({
                current_page: page,
                per_page: pagination.per_page,
              })
            }
            className={`px-3 py-1 rounded-md border text-sm font-medium transition cursor-pointer
    ${
      pagination.current_page === page
        ? "bg-blue-600 text-white border-blue-600" // ACTIVE PAGE
        : "border-gray-300 text-gray-700 hover:bg-gray-100" // NORMAL PAGE
    }
  `}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
