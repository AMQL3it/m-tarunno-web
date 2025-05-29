import { useEffect, useState } from "react";
import {
  FaAngleDoubleRight,
  FaArchive,
  FaChevronDown,
  FaChevronRight, // ✅ Missing import
  FaFolder,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoryService";
import coverService from "../../services/coverService";
import postService from "../../services/postService";
import SidebarSection from "./SidebarSection";

const FeedSidebar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [coverInfo, setCoverInfo] = useState({
    story: [],
    grid: [],
    suggested: [],
    breaking: [],
  });
  const [archivePosts, setArchivePosts] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});

  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postRes, categoryRes, coverRes] = await Promise.all([
        postService.getAll(),
        categoryService.getAll(),
        coverService.getAll(),
      ]);

      const allPosts = postRes.data;

      const storylist =
        coverRes.data.find((item) => item.name === "story")?.content || [];
      const gridlist =
        coverRes.data.find((item) => item.name === "covergrid")?.content || [];
      const suggestedlist =
        coverRes.data.find((item) => item.name === "suggestions")?.content ||
        [];
      const breakinglist =
        coverRes.data.find((item) => item.name === "breaking")?.content || [];

      setCoverInfo({
        story: allPosts.filter((item) => storylist.includes(item.id)),
        grid: allPosts.filter((item) => gridlist.includes(item.id)),
        suggested: allPosts.filter((item) => suggestedlist.includes(item.id)),
        breaking: allPosts.filter((item) => breakinglist.includes(item.id)),
      });

      const groupedArchives = allPosts.reduce((acc, post) => {
        const date = new Date(post.createdAt);
        const key = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!acc[key]) acc[key] = [];
        acc[key].push(post);
        return acc;
      }, {});
      setArchivePosts(groupedArchives);

      setCategories(categoryRes.data || []);
    } catch (err) {
      console.error("Error loading homepage data", err);
    }
  };

  const handleLinkClick = (id) => {
    navigate("./" + id);
  };

  const handlePostLinkClick = (id) => {
    navigate("news/" + id);
  };

  return (
    <aside className="w-full p-4 bg-gray-200 dark:bg-gray-900 rounded-md shadow-md">
      {/* Recent Posts */}
      <SidebarSection title="Recent Posts">
        <div className="flex flex-col gap-3 mt-2">
          {coverInfo.suggested.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePostLinkClick(item.id)}
              className="flex items-center gap-2 text-sm font-medium text-[#127492] hover:text-green-500 dark:text-[#127492] dark:hover:text-green-300 cursor-pointer select-none transition-colors duration-200"
              title={item.response}
            >
              <FaAngleDoubleRight />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* Archives */}
      <SidebarSection title="Archives" className="mt-6">
        <div className="flex flex-col gap-3 mt-2">
          {Object.entries(archivePosts).map(([month, posts]) => {
            const isExpanded = expandedMonths[month];

            return (
              <div key={month}>
                <div
                  onClick={() => toggleMonth(month)}
                  className="flex items-center justify-between text-sm font-medium text-[#127492] hover:text-green-500 dark:text-[#127492] dark:hover:text-green-300 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <FaArchive />
                    <span>{month}</span>
                  </div>
                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {isExpanded && (
                  <ul className="ml-6 mt-1 list-disc text-xs text-gray-700 dark:text-gray-300">
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        onClick={() => handlePostLinkClick(post.id)}
                        className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
                      >
                        {post.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </SidebarSection>

      {/* Categories */}
      <SidebarSection title="Categories" className="mt-6">
        <div className="flex flex-col gap-3 mt-2">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="flex items-center gap-2 text-sm font-medium text-[#127492] hover:text-green-500 dark:text-[#127492] dark:hover:text-green-300 cursor-pointer select-none transition-colors duration-200"
              title={item.response}
            >
              <FaFolder />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </SidebarSection>
    </aside>
  );
};

export default FeedSidebar;
