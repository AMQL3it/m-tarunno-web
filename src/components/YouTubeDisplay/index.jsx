import { useEffect, useState } from "react";
import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getPreviewText from "../../utils/getPreviewText";
import ContinueButton from "../General/ContinueButton";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import TitleLine from "../General/TitleLine";
import getImagePath from "../../utils/getImagePath";

const YouTubeDisplay = ({ category, allposts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(allposts);
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allposts) return;
    const latestPosts = allposts.slice(0, 6);
    setPosts(latestPosts);
    setActivePost(latestPosts[0]);
    setLoading(false);
  }, [allposts]);

  const handleContinue = async (id, views) => {
    await commentService.addState(id, { views: views + 1 });
    navigate(`newsfeed/news/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin dark:border-blue-400 dark:border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <TitleLine title={category} />
      {posts.length === 0 ? (
        <div className="text-center p-6 text-gray-500 dark:text-gray-400">
          No posts found
        </div>
      ) : (
        <div className="flex mt-4 flex-col md:flex-row gap-4">
          {/* LEFT MAIN NEWS */}
          <div className="md:w-2/3">
            {activePost && (
              <div className="flex flex-col gap-2">
                {activePost.type === "video" ? (
                  <iframe
                    src={activePost.media}
                    className="h-64 w-full object-cover"
                    allowFullScreen
                    title="Video Preview"
                  ></iframe>
                ) : (
                  <img
                    src={getImagePath(activePost.image)}
                    alt={activePost.title}
                    className="h-64 w-full object-cover"
                  />
                )}
                {/* <img
                  src={getImagePath(activePost.image)}
                  alt={activePost.title}
                  className="w-full h-64 object-cover rounded"
                /> */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {activePost.title}
                </h3>
                {activePost.tags && (
                  <NewsTag tags={activePost.tags.map((t) => t.name)} />
                )}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <Meta
                    date={new Date(activePost.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                    author={activePost.author}
                  />

                  <div className="flex gap-4 items-center">
                    <span className="cursor-pointer flex items-center gap-1">
                      <FaEye /> {activePost.state.views}
                    </span>
                    <span className="cursor-pointer flex items-center gap-1">
                      <FaHeart /> {activePost.state.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment /> {activePost.comments.length}
                    </span>
                  </div>
                </div>
                <div
                  className="prose max-w-none text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: getPreviewText(activePost.content, 30),
                  }}
                />
                {activePost.content.split(" ").length > 30 && (
                  <div className="mt-2">
                    <ContinueButton
                      onClick={() =>
                        handleContinue(activePost.id, activePost.state.views)
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SUGGESTED NEWS */}
          <div className="md:w-1/3 flex flex-col gap-3">
            {posts
              .filter((post) => post.id !== activePost?.id)
              .slice(0, 6)
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className={`flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition ${
                    post.id === activePost.id
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {post.type === "video" ? (
                    <iframe
                      src={post.media}
                      className="w-24 h-16 object-cover"
                      allowFullScreen
                      title="Video Preview"
                    ></iframe>
                  ) : (
                    <img
                      src={getImagePath(post.image)}
                      alt={post.title}
                      className="w-24 h-16 object-cover"
                    />
                  )}
                  {/* <img
                    src={getImagePath(post.image)}
                    alt={post.title}
                    className="w-24 h-16 object-cover rounded"
                  /> */}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2 text-gray-800 dark:text-gray-100">
                      {post.title}
                    </h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Meta
                        date={new Date(post.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        author={post.author}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeDisplay;
