import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import postService from "../../../services/postService";
import getPreviewText from "../../../utils/getPreviewText";
import SweetAlert from "../../../utils/SweetAlert";
import AddButton from "../../General/AddButton";
import LoadingSpinner from "../../General/LoadingSpinner";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import PostForm from "./PostForm";

const PostManagement = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableHead = [
    "ID",
    "Title",
    "Author",
    "Content",
    "Image",
    "Type",
    "Activity",
  ];
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "image",
    media: "",
    image: "",
    content: "",
    is_active: true,
    // layout: "",
    category_id: "",
    tag_ids: [],
    folder: "posts",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await postService.getAll();
      const formatted = result.data.map((p) => ({
        ...p,
        tag_ids: p.tags.map((t) => t.id) || [],
      }));
      setPosts(formatted);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      author: "",
      type: "image",
      media: "",
      image: "",
      content: "",
      is_active: true,
      // layout: "",
      category_id: "",
      tag_ids: [],
      folder: "posts",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setFormData({
        title: post.title,
        author: post.author,
        type: post.type,
        media: post.media,
        image: post.image,
        content: post.content,
        is_active: post.is_active,
        // layout: post.layout,
        category_id: post.category_id,
        tag_ids: post.tags.map((t) => t.id) || [],
        folder: "posts",
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await SweetAlert.deleteAlert();
    if (confirmed) {
      try {
        await postService.delete(id);
        fetchPosts();
        SweetAlert.successAlert("Post deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        SweetAlert.errorAlert("Failed to delete post!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("author", formData.author);
      sendData.append("type", formData.type);
      sendData.append("media", formData.media);
      sendData.append("content", formData.content);
      sendData.append("is_active", formData.is_active);
      // sendData.append("layout", formData.layout);
      sendData.append("category_id", formData.category_id);

      if (formData.image instanceof File) {
        sendData.append("image", formData.image);
        sendData.append("folder", formData.folder);
      }

      sendData.append("tag_ids", JSON.stringify(formData.tag_ids));

      if (editingId) {
        await postService.update(editingId, sendData);
        SweetAlert.successAlert("Post updated!");
      } else {
        await postService.create(sendData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        SweetAlert.successAlert("Post added!");
      }

      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error("Submit error:", err);
      SweetAlert.errorAlert("Failed to save post!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(posts.length / perPage);
  const displayedPosts = posts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <>
      <TitleLine title="Posts">
        <AddButton onClick={handleAdd} />
      </TitleLine>

      <div className="overflow-x-auto mt-1">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 rounded-lg overflow-hidden shadow-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              {tableHead.map((head, index) => (
                <th key={index} className="px-4 py-2 text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm bg-white dark:bg-gray-900">
            {loading ? (
              <tr>
                <td
                  colSpan={tableHead.length}
                  className="px-4 py-6 text-center"
                >
                  <LoadingSpinner />
                </td>
              </tr>
            ) : displayedPosts.length ? (
              displayedPosts.map((p, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.author}</td>
                  <td className="px-4 py-2">
                    <div
                      className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2 prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getPreviewText(p.content, 20),
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        width={80}
                        height={80}
                        alt="cover"
                        className="rounded-md border dark:border-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No Image</span>
                    )}
                  </td>
                  {/* <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        p.is_active
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      }`}
                    >
                      {p.is_active ? "Enabled" : "Disabled"}
                    </span>
                  </td> */}
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(p.id)}
                        aria-label="Edit Post"
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        aria-label="Delete Post"
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <PostForm
          title={editingId ? "Edit Post" : "Add Post"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          editingId={editingId}
        />
      )}
    </>
  );
};

export default PostManagement;
