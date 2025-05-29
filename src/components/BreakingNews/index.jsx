import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaBullhorn } from "react-icons/fa";

const BreakingNews = ({ bnews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Category colors - consider adding dark mode variants if needed
  const newsTitleColors = {
    International: "bg-green-600",
    Campus: "bg-blue-600",
    Opinion: "bg-red-600",
    Literature: "bg-yellow-600",
    Blog: "bg-pink-600",
    National: "bg-indigo-600",
    Uncategorized: "bg-gray-600",
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bnews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bnews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    // Cleanup interval on unmount or when currentIndex changes
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, bnews.length]);

  const currentNews = bnews[currentIndex];

  return (
    <div className="flex items-stretch h-12 sm:h-auto px-4 mt-2">
      {/* Left Section: Breaking News Label */}
      <div className="flex items-center bg-red-600 dark:bg-red-700 text-white px-3 text-xs sm:text-sm font-medium gap-2 min-w-[40px] sm:min-w-[140px] select-none">
        <FaBullhorn />
        <span className="hidden sm:inline">Breaking News</span>
      </div>

      {/* Right Section: News Content & Arrows */}
      <div className="flex-1 flex justify-between items-center px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden rounded-r">
        {/* News Info */}
        <div className="flex items-center gap-2 text-xs sm:text-sm w-full overflow-hidden">
          <span
            className={`rounded px-2 py-1 text-white text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
              newsTitleColors[currentNews?.category?.name || "Uncategorized"]
            }`}
          >
            {currentNews?.category?.name ?? "Uncategorized"}
          </span>
          <span className="text-gray-700 dark:text-gray-300 font-medium truncate w-full">
            {currentNews?.title}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex flex-row text-sm shrink-0">
          <button
            aria-label="Previous News"
            onClick={handlePrev}
            className="hover:text-black dark:hover:text-white p-1 sm:p-2 text-xs sm:text-sm rounded transition-colors duration-200 focus:outline-none"
          >
            <FaArrowUp />
          </button>
          <button
            aria-label="Next News"
            onClick={handleNext}
            className="hover:text-black dark:hover:text-white p-1 sm:p-2 text-xs sm:text-sm rounded transition-colors duration-200 focus:outline-none"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
