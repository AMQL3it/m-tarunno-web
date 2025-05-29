const Modal = ({ onClose, children, title, onSubmit, status }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md max-w-[95vw] max-h-[95vh] overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 min-w-[300px]">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </span>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-700 dark:text-gray-200 hover:text-red-600"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="mt-3 max-h-[60vh] overflow-y-auto custom-scrollbar text-gray-800 dark:text-gray-100">
          {children}
        </div>

        {/* Footer (form type only) */}
        {status === "form" && (
          <div className="flex justify-end gap-3 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 bg-gray-800 ">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
