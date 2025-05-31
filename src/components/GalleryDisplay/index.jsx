import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getImagePath from "../../utils/getImagePath";
import LoadingSpinner from "../General/LoadingSpinner";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import TitleLine from "../General/TitleLine";

const GalleryDisplay = ({ category, allposts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(allposts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allposts) return;
    const latestPosts = allposts.slice(0, 6);
    setPosts(latestPosts);
    setLoading(false);
    console.log(getImagePath(allposts[0].image));
  }, [allposts]);

  const handleContinue = async (id, views) => {
    await commentService.addState(id, { views: views + 1 });
    navigate(`newsfeed/news/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      <TitleLine title={category} />
      {posts.length === 0 ? (
        <div className="text-center p-6 text-gray-700 dark:text-gray-300">
          No posts found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {posts.map((item) => (
            <div
              key={item.id}
              className="relative rounded overflow-hidden shadow hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleContinue(item.id, item.state?.views || 0)}
            >
              {/* <img
                src={getImagePath(item.image)}
                alt={item.title}
                className="w-full h-full object-cover"
              /> */}
              {item.type === "video" ? (
                <iframe
                  src={item.media}
                  className="h-64 w-full object-cover"
                  allowFullScreen
                  title="Video Preview"
                ></iframe>
              ) : (
                <img
                  src={getImagePath(item.image)}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              )}
              <Overlay>
                <div className="bg-white/80 dark:bg-black/60 p-2">
                  <NewsTag tags={item.tags.map((t) => t.name)} />
                  <span className="text-gray-900 dark:text-white font-semibold text-sm block">
                    {item.title}
                  </span>
                  <Meta
                    date={new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    author={item.author || "Unknown"}
                  />
                </div>
              </Overlay>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryDisplay;
