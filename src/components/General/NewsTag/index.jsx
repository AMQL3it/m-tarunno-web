const NewsTag = ({ tags }) => {
  const getColorClass = (tag) => {
    const map = {
      Gadget: "bg-green-600",
      Tech: "bg-red-600",
      Entertainment: "bg-orange-500",
      Politics: "bg-pink-500",
      Sports: "bg-yellow-600",
      Business: "bg-blue-600",
    };
    return map[tag] || "bg-blue-600";
  };

  return (
    <div className="flex gap-2 mb-1 flex-wrap">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className={`text-xs font-bold text-white px-2 py-[2px] rounded ${getColorClass(
            tag
          )}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default NewsTag;
