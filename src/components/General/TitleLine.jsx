const TitleLine = ({ title, children }) => {
  return (
    <div className="px-4 py-2 border border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 flex justify-between items-center rounded-md">
      <span className="text-gray-800 dark:text-gray-100 font-bold">
        {title}
      </span>
      {children}
    </div>
  );
};

export default TitleLine;
