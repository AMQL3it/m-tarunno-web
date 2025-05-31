import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../services/postService";
import Divider from "../General/Divider";
import LoadingSpinner from "../General/LoadingSpinner";
import NewsItem from "../NewsItem";

const NewsFeed = () => {
  const { catId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!catId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const result = await postService.getAllByCategory(catId);

        const formatted = result.data.map((p) => ({
          ...p,
          tag_ids: p.tags?.map((t) => t.id) || [],
        }));

        setPosts(formatted);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [catId]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(posts.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayed = posts.slice(startIndex, startIndex + displayPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500 dark:text-gray-400 text-lg">
        এই ক্যাটেগরিতে কোনো নিউজ পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 transition-all duration-300 position-relative">
      {/* <div> */}
      {displayed.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}
      {/* </div> */}
      <Divider
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NewsFeed;
