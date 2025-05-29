import { Outlet } from "react-router-dom";
import background from "../assets/background.png";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* Optional Header */}
        {/* 
        <div className="h-[60px] bg-gradient-to-b from-gray-100 to-gray-400 flex items-center justify-center p-2">
          Header Section
        </div> 
        */}
        <div className="flex-1 overflow-y-auto bg-white/80 p-5 dark:bg-black/40">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
