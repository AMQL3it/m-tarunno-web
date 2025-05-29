import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import tagService from "../../../services/tagService";
import SweetAlert from "../../../utils/SweetAlert";
import AddButton from "../../General/AddButton";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import EditForm from "./EditForm";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const tableHead = ["ID", "Name", "Description", "Response", "Activity"];

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    try {
      const result = await tagService.getAll("tags");
      const formattedTags = result.data.map((tag) => ({
        id: tag.id,
        name: `${tag.name} (${tag.slug})`,
        description: tag.description || "No description",
        response: tag.is_active ? "Enable" : "Disable",
      }));
      setTags(formattedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      SweetAlert.errorAlert("Failed to fetch tags!");
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const tagToEdit = tags.find((tag) => tag.id === id);
    if (tagToEdit) {
      setFormData({
        name: tagToEdit.name.split(" (")[0], // remove slug part
        description:
          tagToEdit.description !== "No description"
            ? tagToEdit.description
            : "",
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await tagService.delete(id);
        await getAllTags();
        SweetAlert.successAlert("Tag deleted successfully!");
      } catch (error) {
        console.error("Error deleting tag:", error);
        SweetAlert.errorAlert("Failed to delete tag!");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataCopy = { ...formData };

      // Generate slug from name
      if (formDataCopy.name) {
        formDataCopy.slug = formDataCopy.name
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w_]+/g, "");
      }

      if (editingId) {
        await tagService.update(editingId, formDataCopy);
        SweetAlert.successAlert("Tag updated successfully!");
      } else {
        await tagService.create(formDataCopy);
        SweetAlert.successAlert("Tag added successfully!");
      }

      setIsModalOpen(false);
      getAllTags();
    } catch (error) {
      console.error("Error saving tag:", error);
      SweetAlert.errorAlert("Failed to save tag!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(tags.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedTags = tags.slice(startIndex, startIndex + displayPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TitleLine title="Tags">
        <AddButton onClick={onAdd} />
      </TitleLine>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              {tableHead.map((head, index) => (
                <th
                  key={index}
                  className="px-4 py-3 border-b border-gray-300 dark:border-gray-600"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedTags.length > 0 ? (
              displayedTags.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.description}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        row.response === "Enable"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {row.response}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      aria-label="Edit Tag"
                      onClick={() => onEdit(row.id)}
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      aria-label="Delete Tag"
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHead.length}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
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
        onPageChange={handlePageChange}
      />

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <EditForm
          title={"Tag"}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          editingId={editingId}
        />
      )}
    </>
  );
};

export default Tag;
