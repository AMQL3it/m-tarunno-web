import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getPreviewText from "../../utils/getPreviewText";
import ContinueButton from "../General/ContinueButton";
import Meta from "../General/Meta";
import MetaCol from "../General/MetaCol";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import TitleLine from "../General/TitleLine";
import getImagePath from "../../utils/getImagePath";

const FoodDisplay = ({ category, allposts }) => {
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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 w-full lg:w-4/6">
      <TitleLine title={category} />

      {posts.length === 0 ? (
        <div className="text-center p-6 text-gray-700 dark:text-gray-300">
          No posts found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Main Featured Post */}
          {activePost && (
            <div className="relative rounded overflow-hidden shadow hover:shadow-md transition-all">
              {/* <img
                src={getImagePath(activePost.image)}
                alt={activePost.title}
                className="w-full h-full object-cover"
              /> */}
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
                  className="h-full w-full object-cover"
                />
              )}
              <Overlay>
                <div className="bg-white/80 dark:bg-black/60 p-2">
                  <NewsTag tags={activePost.tags.map((t) => t.name)} />
                  <span className="text-gray-900 dark:text-white font-semibold text-sm">
                    {activePost.title}
                  </span>
                  <Meta
                    date={new Date(activePost.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    author={activePost.author || "Unknown"}
                  />
                  <div
                    className="prose max-w-none text-gray-800 dark:text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: getPreviewText(activePost.content, 30),
                    }}
                  />
                  {activePost.content?.split(" ").length > 30 && (
                    <div className="mt-2">
                      <ContinueButton
                        onClick={() => {
                          handleContinue(
                            activePost.id,
                            activePost.state?.views || 0
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </Overlay>
            </div>
          )}

          {/* Suggested Posts */}
          <div className="flex flex-col sm:flex-row gap-4">
            {posts
              .filter((post) => post.id !== activePost?.id)
              .slice(0, 4)
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                  }}
                  className="flex flex-col cursor-pointer bg-white dark:bg-gray-800 rounded shadow overflow-hidden hover:shadow-md transition w-full sm:w-1/3"
                >
                  {post.type === "video" ? (
                    <iframe
                      src={post.media}
                      className="h-36 w-full object-cover"
                      allowFullScreen
                      title="Video Preview"
                    ></iframe>
                  ) : (
                    <img
                      src={getImagePath(post.image)}
                      alt={post.title}
                      className="h-36 w-full object-cover"
                    />
                  )}
                  {/* <img
                    src={getImagePath(post.image)}
                    alt={post.title}
                    className="h-36 w-full object-cover"
                  /> */}
                  <div className="p-2">
                    <h4 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {getPreviewText(post.content, 15)}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                      <MetaCol
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

export default FoodDisplay;
