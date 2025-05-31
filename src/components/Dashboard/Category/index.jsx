import { useEffect, useState } from "react";
import {
  FaBook,
  FaCamera,
  FaChartBar,
  FaComments,
  FaEdit,
  FaEye,
  FaNewspaper,
  FaRocket,
  FaTrashAlt,
} from "react-icons/fa";
import categoryService from "../../../services/categoryService";
import SweetAlert from "../../../utils/SweetAlert";
import AddButton from "../../General/AddButton";
import LoadingSpinner from "../../General/LoadingSpinner";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import EditForm from "./EditForm";
import ViewModal from "./ViewModal";

// Icon mapping
const iconMap = {
  book: <FaBook title="Book" />,
  news: <FaNewspaper title="News" />,
  camera: <FaCamera title="Camera" />,
  stats: <FaChartBar title="Stats" />,
  comments: <FaComments title="Comments" />,
  rocket: <FaRocket title="Rocket" />,
};

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    layout: "",
    icon: "",
  });

  const tableHead = [
    "ID",
    "Name",
    "Description",
    "Layout",
    "Icon",
    "Response",
    "Activity",
  ];

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const result = await categoryService.getAll();

      const formattedCategories = result.data.map((categorie) => ({
        id: categorie.id,
        name: `${categorie.name} (${categorie.slug})`,
        description: categorie.description || "No description",
        layout: categorie.layout || "default",
        icon: categorie.icon || "default",
        response: categorie.is_active ? "Enable" : "Disable",
      }));

      setCategories(formattedCategories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", layout: "", icon: "" });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const categoryToEdit = categories.find((categorie) => categorie.id === id);
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name.split(" (")[0],
        description:
          categoryToEdit.description !== "No description"
            ? categoryToEdit.description
            : "",
        layout:
          categoryToEdit.layout !== "default" ? categoryToEdit.layout : "",
        icon: categoryToEdit.icon !== "default" ? categoryToEdit.icon : "",
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await categoryService.delete(id);
        getAllCategories();
        SweetAlert.successAlert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category:", error);
        SweetAlert.errorAlert("Failed to delete category!");
      }
    }
  };

  const [cid, setCid] = useState(null);
  const onView = (id) => {
    setCid(id);
    setIsViewModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataCopy = { ...formData };

      if (formDataCopy.name) {
        formDataCopy.slug = formDataCopy.name
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w_]+/g, "");
      }

      if (editingId) {
        await categoryService.update(editingId, formDataCopy);
        SweetAlert.successAlert("Category updated successfully!");
      } else {
        await categoryService.create(formDataCopy);
        SweetAlert.successAlert("Category added successfully!");
      }

      setIsModalOpen(false);
      getAllCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      SweetAlert.errorAlert("Failed to save category!");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(categories.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedCategories = categories.slice(
    startIndex,
    startIndex + displayPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <>
      <TitleLine title="Categories">
        <AddButton onClick={onAdd} />
      </TitleLine>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left text-sm uppercase">
              {tableHead.map((head, index) => (
                <th key={index} className="px-4 py-3 border-b">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Loading Spinner */}
            {loading ? (
              <tr>
                <td
                  colSpan={tableHead.length}
                  className="px-4 py-6 text-center"
                >
                  <LoadingSpinner />
                </td>
              </tr>
            ) : displayedCategories.length > 0 ? (
              // Display Data
              displayedCategories.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.description}</td>
                  <td className="px-4 py-2">{row.layout}</td>
                  <td className="px-4 py-2">{iconMap[row.icon] || row.icon}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        row.response === "Enable"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {row.response}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => onView(row.id)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onEdit(row.id)}
                      className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-yellow-100"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-500 hover:text-red-600 dark:text-red-300 dark:hover:text-red-100"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // No Data
              <tr>
                <td
                  colSpan={tableHead.length}
                  className="text-center py-6 text-gray-500 dark:text-gray-300"
                >
                  No data found.
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

      {isModalOpen && (
        <EditForm
          title="Category"
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          editingId={editingId}
        />
      )}

      {isViewModalOpen && (
        <ViewModal cid={cid} onClose={() => setIsViewModalOpen(false)} />
      )}
    </>
  );
};

export default Category;
