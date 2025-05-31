/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FaComment, FaEye, FaHeart, FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import commentService from "../../services/commentService";
import postService from "../../services/postService";
import SweetAlert from "../../utils/SweetAlert";
import WriteComment from "../Comment/WriteComment";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const NewsCard = () => {
  const { newsId } = useParams();
  const user = useAuthUser();

  const [news, setNews] = useState(null);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef();

  useEffect(() => {
    fetchNews();
  }, [newsId]);

  const fetchNews = async () => {
    try {
      const result = await postService.getById(newsId);
      const newsData = {
        id: result.data.id,
        title: result.data.title,
        type: result.data.type,
        media: result.data.media,
        content: result.data.content,
        image: result.data.image,
        createdAt: result.data.createdAt,
        author: result.data.author,
        tags: result.data.tags,
        category: result.data.category.name,
      };

      setNews(newsData);
      setViews(result.data.state?.views || 0);
      setLikes(result.data.state?.likes || 0);
      setComments(result.data.comments || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    try {
      await commentService.addState(newsId, { likes: likes + 1 });
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleNewComment = async ({ text }) => {
    try {
      const comment = {
        comment: text,
        post_id: newsId,
        user_id: user?.user_id,
      };
      await commentService.addComment(comment);
      fetchNews();
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  // const handleShare = () => {
  //   const shareUrl = window.location.href;
  //   const text = `Check out this news: ${news.title}`;

  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: news.title,
  //         text,
  //         url: shareUrl,
  //       })
  //       .catch((err) => console.error("Share failed:", err));
  //   } else {
  //     // Fallback - open Facebook share in new tab
  //     const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //       shareUrl
  //     )}`;
  //     window.open(facebook, "_blank");
  //   }
  // };

  const handleShareToggle = () => {
    setShowShareMenu((prev) => !prev);
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, "_blank");
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // alert("🔗 Link copied to clipboard!");
      SweetAlert.confirmAlert("🔗 Link copied to clipboard!");
      setShowShareMenu(false);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Close share menu if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!news) {
    return (
      <div className="text-center p-6 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-200 dark:bg-gray-900 shadow-md rounded-lg">
      {news.type === "video" ? (
        <iframe
          src={news.media}
          className="mt-2 w-full h-64 rounded-md mb-4"
          allowFullScreen
          title="Video Preview"
        ></iframe>
      ) : (
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}

      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {news.title}
      </h3>

      {news.tags && (
        <div className="mb-4">
          <NewsTag tags={news.tags.map((t) => t.name)} />
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 mb-4"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />

      <div className="mt-4 flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-300 border-t pt-3">
        <Meta
          date={new Date(news.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          author={news.author}
        />

        <div className="flex gap-4 items-center mt-2 sm:mt-0">
          <span className="flex items-center gap-1">
            <FaEye /> {views}
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer text-red-500 hover:text-red-600"
            onClick={handleLike}
          >
            <FaHeart /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <FaComment /> {comments.length}
          </span>
          {/* <span
            onClick={handleShare}
            title="Share this post"
            className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-800"
          >
            <FaShareAlt /> Share
          </span> */}
          <div className="relative" ref={shareMenuRef}>
            <span
              onClick={handleShareToggle}
              title="Share this post"
              className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-800"
            >
              <FaShareAlt /> Share
            </span>

            {showShareMenu && (
              <div className="absolute z-10 top-8 right-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow w-40 text-sm">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  📱 WhatsApp
                </button>
                <button
                  onClick={handleFacebookShare}
                  className="w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  👤 Facebook
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  📋 Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <WriteComment onSubmit={handleNewComment} />
      </div>

      <ul className="mt-6 space-y-4">
        {comments.map((c, i) => (
          <li
            key={i}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{c.user?.name ?? "Unknown"}</span>
              <span>
                {new Date(c.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <p className="text-gray-800 dark:text-gray-100">{c.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCard;
