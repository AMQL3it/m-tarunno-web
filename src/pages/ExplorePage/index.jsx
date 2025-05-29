import { Outlet } from "react-router-dom";
import FeedSidebar from "../../components/FeedSidebar/FeedSidebar";

const ExplorePage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-1.5 w-full px-2">
      <div className="w-full md:w-[75vw] flex flex-col gap-1.5">
        <Outlet />
      </div>
      <div className="w-full md:w-[25vw] bg-transparent rounded-lg shadow-sm">
        <FeedSidebar />
      </div>
    </div>
  );
};

export default ExplorePage;
