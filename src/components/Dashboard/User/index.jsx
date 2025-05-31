import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import apiService from "../../../services/apiService";
import SweetAlert from "../../../utils/SweetAlert";
import AddButton from "../../General/AddButton";
import LoadingSpinner from "../../General/LoadingSpinner";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import UserForm from "./UserForm";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const tableHead = ["ID", "Name", "Email", "Phone", "Role", "Activity"];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await apiService.getAll("users"); // 🔥 await added
      // console.log(data);
      setUsers(data.data); // ✅ use actual API data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // setUsers(fallback); // 🛠 fallback to dummy if API fails
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role_id: 4,
    });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        password: "",
        confirmPassword: "",
        role_id:
          userToEdit.role_id ||
          roles.find((r) => r.name === userToEdit.role?.name)?.id ||
          4,
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await apiService.delete(`users/${id}`);
        await getUsers();
        SweetAlert.successAlert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        SweetAlert.errorAlert("Failed to delete user!");
      }
    }
  };

  const roles = [
    { id: 1, name: "superadmin" },
    { id: 2, name: "admin" },
    { id: 3, name: "editor" },
    { id: 4, name: "user" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "role_id") {
      setFormData((prev) => ({ ...prev, role_id: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role_id: 4,
    });
  };

  const printRole = (role) => {
    const name = role?.name || roles.find((r) => r.id === role)?.name;
    if (name === "superadmin")
      return <span className="text-red-500 font-semibold">Super Admin</span>;
    if (name === "admin")
      return <span className="text-green-500 font-semibold">Admin</span>;
    if (name === "editor")
      return <span className="text-blue-500 font-semibold">Editor</span>;
    return <span className="text-gray-500 font-semibold">User</span>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // detele form password
        delete formData.password;
        delete formData.confirmPassword;

        await apiService.update(`users`, editingId, formData);
        SweetAlert.successAlert("User updated successfully!");
      } else {
        await apiService.post("users", formData);
        SweetAlert.successAlert("User added successfully!");
      }
      handleModalClose();
      getUsers();
    } catch (err) {
      console.error(err);
      SweetAlert.errorAlert("Something went wrong!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(users.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + displayPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TitleLine title="User">
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
            {loading ? (
              <tr>
                <td
                  colSpan={tableHead.length}
                  className="px-4 py-6 text-center"
                >
                  <LoadingSpinner />
                </td>
              </tr>
            ) : displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">{printRole(user.role)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      aria-label="Edit User"
                      onClick={() => onEdit(user.id)}
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      aria-label="Delete User"
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center">
                  No users found.
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
        <UserForm
          title={"User"}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleModalClose={handleModalClose}
          editingId={editingId}
        />
      )}
    </>
  );
};

export default User;
