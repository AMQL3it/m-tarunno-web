const Divider = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center border-t border-gray-300 py-2 mt-3 position-absolute bottom-0">
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
        &laquo; Previous
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

export default Divider;
