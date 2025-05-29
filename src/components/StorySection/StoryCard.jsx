import getImagePath from "../../utils/getImagePath";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const StoryCard = ({ story }) => {
  return (
    <div className="relative w-full max-w-full h-full rounded overflow-hidden flex-none sm:h-[60vh]">
      {/* <img
        src={getImagePath(story.image)}
        alt={story.title}
        className="w-full h-full object-cover block"
      /> */}

      {story.type === "video" ? (
        <iframe
          src={story.media}
          className="w-full h-full object-cover block"
          allowFullScreen
          title="Video Preview"
        ></iframe>
      ) : (
        <img
          src={getImagePath(story.image)}
          alt={story.title}
          className="w-full h-full object-cover block"
        />
      )}

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-4 dark:from-gray-900/80">
        {story.tags && (
          <div className="flex gap-2 mb-2 flex-wrap">
            <NewsTag tags={story.tags.map((t) => t.name)} />
          </div>
        )}
        <h2 className="text-sm font-semibold mb-1 dark:text-gray-200">
          {story.title}
        </h2>
        <Meta
          date={new Date(story.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          author={story.author}
        />
      </div>
    </div>
  );
};

export default StoryCard;
