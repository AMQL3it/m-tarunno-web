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
    if (stories.length > 0) {
      setLoading(false);
    }
  }, [stories]);

  useEffect(() => {
    if (stories.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= stories.length - 1 ? 0 : prev + 1));
    }, 3000);
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
    navigate(`newsfeed/news/${id}`);
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
    <div className="relative overflow-hidden w-full dark:bg-gray-900">
      <div
        className="flex transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * (100 / stories.length)}%)`,
          width: `${stories.length * 100}%`,
        }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleContinue(story.id, story.state?.views || 0)}
            style={{ width: `${100 / stories.length}%` }}
          >
            <StoryCard
              story={story}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySection;
