import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import StoryCard from "./StoryCard";

const StorySection = ({ stories }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stories.length > 0) setLoading(false);
  }, [stories]);

  useEffect(() => {
    if (stories.length > 0) startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= stories.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev >= stories.length - 1 ? 0 : prev + 1));
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev <= 0 ? stories.length - 1 : prev - 1));
    startAutoSlide();
  };

  const handleContinue = async (id, views) => {
    await commentService.addState(id, { views: views + 1 });
    navigate(`/newsfeed/news/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 dark:bg-gray-900 dark:text-gray-200">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 dark:bg-gray-900 dark:text-gray-400">
        <p>No stories found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full dark:bg-gray-900 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / stories.length)}%)`,
          width: `${stories.length * 100}%`,
        }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-full cursor-pointer"
            onClick={() => handleContinue(story.id, story.state?.views || 0)}
            style={{ width: `${100 / stories.length}%` }}
          >
            <StoryCard story={story} />
          </div>
        ))}
      </div>

      {/* Optional Navigation Buttons (future enhancement) */}

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
      >
        ⬅
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
      >
        ➡
      </button>
    </div>
  );
};

export default StorySection;
