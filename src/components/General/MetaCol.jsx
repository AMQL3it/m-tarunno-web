import { FaCalendarCheck, FaUserTie } from "react-icons/fa";
const MetaCol = ({ date, author }) => {
  return (
    <div className="flex flex-col justify-between text-sm text-gray-600">
      <span className="flex algems-center gap-2">
        <FaCalendarCheck />
        {date}
      </span>
      <span className="flex algems-center gap-2">
        <FaUserTie />
        {author}
      </span>
    </div>
  );
};

export default MetaCol;
