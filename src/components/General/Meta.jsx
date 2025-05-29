import { FaCalendarCheck, FaUserTie } from "react-icons/fa";

const Meta = ({ date, author }) => {
  return (
    <div className="text-xs flex gap-2 text-gray-600 dark:text-gray-400">
      <span className="flex items-center gap-1.5">
        <FaCalendarCheck className="text-sm" />
        {date}
      </span>
      <span className="flex items-center gap-1.5">
        <FaUserTie className="text-sm" />
        {author}
      </span>
    </div>
  );
};

export default Meta;
