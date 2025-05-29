import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Tarunno.png";
import useAuthUser from "../../hooks/useAuthUser";
import authService from "../../services/authService";
import { getBanglaDate } from "../../utils/getBanglaDate";
import { getBanglaHijriDate } from "../../utils/getBanglaHijriDate";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const today = new Date();
  const user = useAuthUser();

  const engDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const engDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const todayIso = today.toISOString().split("T")[0];
  const todayBangla = getBanglaDate(todayIso);
  const hijriDate = getBanglaHijriDate(todayIso);

  const navigate = useNavigate();

  const handleGotoHome = () => navigate("/");
  const handleGoToLogin = () => navigate("/login");
  const handleGoToRegister = () => navigate("/register");

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Bar: Date & Auth */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 px-4 py-2 bg-[#127492] text-white text-sm dark:bg-[#127492] dark:text-gray-200">
        {/* Date Info */}
        <div className="flex flex-wrap items-center gap-2 text-center">
          <FaRegCalendarCheck />
          <span>{engDay} |</span>
          <span>{engDate} |</span>
          <span>{todayBangla} |</span>
          <span>{hijriDate}</span>
        </div>

        {/* Auth Links */}
        <div className="flex items-center gap-3 font-medium">
          {user ? (
            <div
              
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>{user.name}</span>
              {user.role !== "user" && (
                <>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-400" onClick={() => navigate("/dashboard")}>({user.role})</span>
                </>
              )}

              <FaRightToBracket onClick={handleLogout}/>
            </div>
          ) : (
            <>
              <div
                className="flex items-center gap-1 cursor-pointer hover:underline"
                onClick={handleGoToLogin}
              >
                <FaRightToBracket />
                <span>Login</span>
              </div>
              <span>|</span>
              <div
                className="flex items-center gap-1 cursor-pointer hover:underline"
                onClick={handleGoToRegister}
              >
                <FaUserPlus />
                <span>Register</span>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 position-absolute">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Header Body: Logo + Tagline */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 gap-4 bg-white dark:bg-[#1f1f1f] transition-colors">
        {/* Logo Section */}
        <div
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={handleGotoHome}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[180px] sm:w-[160px] md:w-[200px] lg:w-[250px]"
          />
        </div>

        {/* Tagline or Right Content */}
        <div className="bg-gray-300 dark:bg-gray-800 w-full md:w-1/2 flex justify-center items-center py-3 px-5 rounded-lg h-[100px] shadow-md">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Event Management
          </h1>
        </div>
      </div>

      {/* Optional: ThemeToggle Button */}
      {/* <div className="flex items-center gap-2 position-absolute">
        <ThemeToggle />
      </div> */}
    </div>
  );
};

export default Header;
