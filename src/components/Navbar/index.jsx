import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import ThemeToggle from "@/components/ui/ThemeToggle"; // Uncomment when using

const Navbar = ({ navlist }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-[#127492] text-white dark:bg-[#127492] dark:text-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
        {/* Left - Logo/Home */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-xl font-bold flex items-center gap-2">
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <FaBars size={22} />
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`w-full md:flex md:items-center md:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex md:space-x-4 flex flex-col md:flex-row mt-3 md:mt-0">
            {navlist.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/newsfeed/${cat.id}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium rounded transition duration-300 ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-gray-800 dark:text-white"
                        : "hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Search bar */}
          {/* <div className="mt-3 md:mt-0 md:ml-4 flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-l bg-white text-gray-800 w-full md:w-64 focus:outline-none dark:bg-gray-100 dark:text-gray-900"
            />
            <button className="bg-[#116A7B] hover:bg-[#0F4C5C] text-white px-4 py-1 rounded-r transition duration-300">
              Search
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
