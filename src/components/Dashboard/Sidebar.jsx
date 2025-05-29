import { useEffect, useState } from "react";
import {
  FaAd,
  FaChartBar,
  FaCog,
  FaComments,
  FaList,
  FaRegNewspaper,
  FaTachometerAlt,
  FaTags,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, to: "" },
    { name: "Posts", icon: <FaRegNewspaper />, to: "posts" },
    { name: "Category", icon: <FaList />, to: "categories" },
    { name: "Tags", icon: <FaTags />, to: "tags" },
    { name: "Advertisement", icon: <FaAd />, to: "advertisements" },
    { name: "Comments", icon: <FaComments />, to: "comments" },
    { name: "Users", icon: <FaUsers />, to: "users" },
    { name: "Analytics & Reports", icon: <FaChartBar />, to: "analytics" },
    { name: "Settings", icon: <FaCog />, to: "settings", bottom: true },
    { name: "Profile", icon: <FaUser />, to: "profile", bottom: true },
  ];

  useEffect(() => {
    const currentPath = location.pathname.split("/").filter(Boolean).pop();
    setActive(currentPath || "");
  }, [location]);

  return (
    <div className="w-[250px] h-[100vh] bg-black/60 text-white p-4 flex flex-col justify-between">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
          onClick={() => navigate("/")}
        />
        <h2 className="text-lg font-bold">AMQL3it</h2>
      </div>

      {/* Top Menu */}
      <div className="flex flex-col gap-2 mt-6 flex-1">
        {menuItems
          .filter((item) => !item.bottom)
          .map((item, index) => (
            <NavLink
              to={item.to}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 ${
                  active === item.to || isActive
                    ? "bg-green-600 font-bold"
                    : "hover:bg-gray-500/50"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-gray-300 pt-4 flex flex-col gap-2">
        {menuItems
          .filter((item) => item.bottom)
          .map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item.to)}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 text-left ${
                active === item.to
                  ? "bg-green-600 font-bold"
                  : "hover:bg-gray-500/50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
