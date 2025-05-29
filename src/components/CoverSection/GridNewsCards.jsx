import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getImagePath from "../../utils/getImagePath";
import Meta from "../General/Meta";
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

  // const fetchPosts = async () => {
  //   try {
  //     const result = await postService.getAll();
  //     const formatted = result.data.map((p) => ({
  //       id: p.id,
  //       title: p.title,
  //       content: p.content,
  //       image: p.image,
  //       createdAt: p.createdAt,
  //       author: p.author,
  //       tags: p.tags || [],
  //       category: p.category?.name || "Uncategorized",
  //     }));

  //     const latestPosts = formatted.slice(0, 4);
  //     setPosts(latestPosts);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Failed to fetch posts", err);
  //     setLoading(false);
  //   }
  // };

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
          {/* <img
            src={getImagePath(item.image)}
            alt="news"
            className="w-full h-full object-cover"
          /> */}
          {item.type === "video" ? (
            <iframe
              src={item.media}
              className="w-full h-full object-cover block"
              allowFullScreen
              title="Video Preview"
            ></iframe>
          ) : (
            <img
              src={getImagePath(item.image)}
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
            <div className="text-sm font-semibold">{item.title}</div>
            <Meta
              date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              author={item.author}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridNewsCards;
