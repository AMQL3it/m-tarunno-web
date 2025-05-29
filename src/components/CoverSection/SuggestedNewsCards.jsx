import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Meta from "../General/Meta";

import commentService from "../../services/commentService";

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
    <div className="w-full bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
      <div className="flex gap-4 min-w-[600px] flex-row sm:min-w-0">
        {suggestedNews.map((item) => (
          <div
            key={item.id}
            className="flex bg-white dark:bg-gray-900 rounded-md shadow-md dark:shadow-black/50 overflow-hidden h-[150px] min-w-[280px] sm:min-w-0 sm:w-full sm:h-auto cursor-pointer"
          >
            {/* <img
              src={getImagePath(item.image)}
              alt={item.title}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              className="w-1/2 h-full object-cover sm:w-1/3 sm:h-[100px]"
            /> */}
            <div className="flex flex-col justify-between p-3 w-full sm:w-auto">
              <p
                className="text-sm font-semibold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-3 text-gray-900 dark:text-gray-100"
                onClick={() => handleContinue(item.id, item.views)}
              >
                {item.title}
              </p>
              <Meta
                date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                author={item.author}
                className="text-gray-700 dark:text-gray-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedNewsCards;
