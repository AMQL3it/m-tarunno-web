import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import categoryService from "../../../services/categoryService";
import tagService from "../../../services/tagService";
import SweetAlert from "../../../utils/SweetAlert";
import Modal from "../../General/Modal";

const ViewModal = ({ cid, onClose }) => {
  const [category, setCategory] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState("");

  useEffect(() => {
    fetchAllTags();
    fetchCategoryById(cid);
  }, [cid]);

  const fetchAllTags = async () => {
    const res = await tagService.getAll("tags");
    setAllTags(res.data || []);
  };

  const fetchCategoryById = async (cid) => {
    const res = await categoryService.getById(cid);
    setCategory(res.data || {});
    setSelectedTags(res.data?.tags || []);
  };

  const handleSelectTag = (e) => {
    setSelectedTagId(e.target.value);
  };

  const handleAddTag = async () => {
    const tagToAdd = allTags.find((tag) => tag.id === parseInt(selectedTagId));
    if (!tagToAdd) return;
    await categoryService.addTag(cid, { tag_id: tagToAdd.id });
    fetchCategoryById(cid);
    SweetAlert.successAlert("✅ Tag added successfully!");
  };

  const handleToggleTagStatus = (tagId) => {
    setSelectedTags((prev) =>
      prev.map((tag) =>
        tag.id === tagId ? { ...tag, is_active: !tag.is_active } : tag
      )
    );
  };

  const handleRemoveTag = async (tagId) => {
    await categoryService.removeTag(cid, tagId);
    fetchCategoryById(cid);
    SweetAlert.successAlert("🗑️ Tag removed successfully!");
  };

  return (
    <Modal onClose={onClose} title="📂 Category Details">
      <div className="flex flex-col gap-6 text-gray-800 dark:text-gray-100">
        {/* Category Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <p>
            <strong>Name:</strong> {category.name}
          </p>
          <p>
            <strong>Slug:</strong> {category.slug}
          </p>
          <p>
            <strong>Description:</strong> {category.description || "—"}
          </p>
          <p>
            <strong>Layout:</strong> {category.layout}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {category.is_active ? "🟢 Active" : "🔴 Inactive"}
          </p>
        </div>

        {/* Tag Table & Selector */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tag Table */}
          <div className="flex-1 ">
            <table className="w-full border border-gray-300 dark:border-gray-600 text-sm text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Slug</th>
                  <th className="px-3 py-2">Active</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag) => (
                    <tr
                      key={tag.id}
                      className="border-t border-gray-200 dark:border-gray-600"
                    >
                      <td className="px-3 py-2">{tag.name}</td>
                      <td className="px-3 py-2">{tag.slug}</td>
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={tag.is_active}
                          onChange={() => handleToggleTagStatus(tag.id)}
                          className="accent-green-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => handleRemoveTag(tag.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3 text-gray-500">
                      No tags added.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tag Selector */}
          <div className="flex flex-col gap-2 w-full lg:w-1/3">
            <label htmlFor="tagSelect" className="text-sm font-medium">
              Select Tag:
            </label>
            <select
              id="tagSelect"
              onChange={handleSelectTag}
              value={selectedTagId}
              className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">-- Select a tag --</option>
              {allTags
                .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
                .map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ➕ Add Tag
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
