import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import Meta from "../General/Meta";

const SuggestedNewsCards = ({ suggestedNews }) => {
  const navigate = useNavigate();

  const handleContinue = useCallback(
    async (id, views) => {
      await commentService.addState(id, { views: views + 1 });
      navigate(`newsfeed/news/${id}`);
    },
    [navigate]
  );

  if (!suggestedNews || suggestedNews.length === 0) {
    return (
      <div className="w-full text-center text-gray-600 dark:text-gray-300 py-10">
        No suggested news available.
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-4 rounded-xl overflow-x-auto shadow-sm">
      {/* Responsive Layout */}
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4 flex-wrap">
        {suggestedNews.map((item) => (
          <div
            key={item.id}
            onClick={() => handleContinue(item.id, item.views)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-full md:w-[280px] lg:w-[280px] xl:w-[280px] 2xl:w-[280px]"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-3">
                {item.title}
              </p>
              <Meta
                date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                author={item.author}
                className="text-sm text-gray-600 dark:text-gray-400 mt-3"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedNewsCards;
