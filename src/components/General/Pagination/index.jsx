const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-5 text-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-2 px-4 py-1 rounded text-white transition 
          ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        &laquo; Prev
      </button>

      <span className="mx-2 text-sm md:text-base font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-2 px-4 py-1 rounded text-white transition 
          ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
