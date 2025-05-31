import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getPreviewText from "../../utils/getPreviewText";
import ContinueButton from "../General/ContinueButton";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const NewsItem = ({ news }) => {
  const navigate = useNavigate();

  const handleContinue = async (views) => {
    await commentService.addState(news.id, { views: views + 1 });
    navigate("../news/" + news.id);
  };

  return (
    <div className="flex flex-col gap-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-900 shadow-md transition duration-300">
      {news.type === "video" ? (
        <iframe
          src={news.media}
          className="mt-2 w-full h-52 md:h-64 rounded"
          allowFullScreen
          title="Video Preview"
        ></iframe>
      ) : (
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-52 md:h-64 object-cover rounded-lg"
        />
      )}

      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
        {news.title}
      </h3>

      <NewsTag tags={news.tags.map((t) => t.name)} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        <Meta
          date={new Date(news.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          author={news.author}
        />

        <div className="flex gap-4 items-center mt-3 md:mt-0">
          <span className="flex items-center gap-1 cursor-pointer">
            <FaEye className="text-base text-gray-500 dark:text-gray-400" />
            {news.state?.views || 0}
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <FaHeart className="text-base text-gray-500 dark:text-gray-400" />
            {news.state?.likes || 0}
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <FaComment className="text-base text-gray-500 dark:text-gray-400" />
            {news.comments.length}
          </span>
        </div>
      </div>

      <div
        className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2 prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: getPreviewText(news.content, 30) }}
      />

      {news.content.split(" ").length > 30 && (
        <ContinueButton
          onClick={() => handleContinue(news.state?.views || 0)}
        />
      )}
    </div>
  );
};

export default NewsItem;
