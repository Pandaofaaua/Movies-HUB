"use client";

interface PaginationButtonsProps {
  query: string;
  currentPage: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  query,
  currentPage,
}) => {
  const handleNavigation = (newPage: number) => {
    if (query === "popular") {
      window.location.href = `/?page=${newPage}`;
    } else if (query.startsWith("genre/")) {
      const genreId = query.split("/")[1];
      window.location.href = `/genre/${genreId}?page=${newPage}`;
    } else {
      window.location.href = `/search?query=${encodeURIComponent(
        query
      )}&page=${newPage}`;
    }
  };

  return (
    <div className="flex justify-between mt-6">
      <button
        disabled={currentPage <= 1}
        onClick={() => handleNavigation(currentPage - 1)}
        className="px-4 py-2 bg-blue-100 dark:bg-white
         text-blue-500 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={() => handleNavigation(currentPage + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
