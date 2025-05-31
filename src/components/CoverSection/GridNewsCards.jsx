import { useEffect, useState } from "react";
import { FaCalendarCheck, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import NewsTag from "../General/NewsTag";

const GridNewsCards = ({ gridNews }) => {
  const navigate = useNavigate();
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gridNews.length > 0) {
      setLoading(false);
    }
  }, [gridNews]);

  const handleContinue = async (id, views) => {
    await commentService.addState(id, { views: views + 1 });
    navigate(`newsfeed/news/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (gridNews.length === 0) {
    return <div className="text-center p-6">No posts found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-1 md:grid-cols-2">
      {gridNews.map((item) => (
        <div
          key={item.id}
          className="relative rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleContinue(item.id, item.views)}
        >
          {item.type === "video" ? (
            <iframe
              src={item.media}
              className="w-full h-full object-cover block"
              allowFullScreen
              title="Video Preview"
            ></iframe>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover block"
            />
          )}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-3">
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2">
                <NewsTag tags={item.tags.map((t) => t.name)} />
              </div>
            )}
            <div className="text-[11px] 2xl:text-sm xl:text-sm lg:text-sm md:text-sm font-semibold">
              {item.title}
            </div>
            <div className="text-xs flex-wrap gap-2 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <FaCalendarCheck className="text-sm" />
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <FaUserTie className="text-sm" />
                {item.author}
              </span>
            </div>
            {/* <Meta
              date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              author={item.author}
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridNewsCards;
