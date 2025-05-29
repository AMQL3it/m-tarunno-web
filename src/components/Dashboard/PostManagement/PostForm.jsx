/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import Modal from "../../General/Modal";
import RichTextEditor from "./RichTextEditor";

const PostForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  setIsModalOpen,
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(
    formData.image == "" ? null : `http://localhost:5000/${formData.image}`
  );
  // const layouts = ["Standard", "Featured", "Minimal"];
  const news_types = ["image", "video"];
  const [content, setContent] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  // useEffect(() => {
  //   if (typeof formData.image === "string" && formData.image !== "") {
  //     setPreview("http://localhost:5000/" + formData.image); // for edit mode
  //   }
  //   console.log(formData);
  // }, [formData.image]);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
      setContent(formData.content);

      if (formData.category_id) {
        const selected = res.data.find((c) => c.id === formData.category_id);
        setTags(selected?.tags || []);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      const id = parseInt(value);
      const selected = categories.find((c) => c.id === id);
      setTags(selected?.tags || []);
      setFormData({ ...formData, category_id: id, tag_ids: [] });
    } else if (name === "media") {
      setFormData({
        ...formData,
        [name]: isValidVideoLink(value) ? convertToEmbedLink(value) : value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setFormData({ ...formData, content: newContent });
  };

  const handleTagToggle = (tagId) => {
    const exists = formData.tag_ids.includes(tagId);
    const updated = exists
      ? formData.tag_ids.filter((id) => id !== tagId)
      : [...formData.tag_ids, tagId];

    setFormData({ ...formData, tag_ids: updated });
  };

  const isValidVideoLink = (url) => {
    return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  };

  const convertToEmbedLink = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId =
        urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
      console.log(e);

      return "";
    }
  };

  return (
    <Modal
      title={title}
      status="form"
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col gap-5 text-gray-900 dark:text-gray-100 ">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* News type */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">News Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">Select layout</option>
            {news_types.map((type, i) => (
              <option key={i} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Media */}

        {/* Media input (video or image) */}
        {formData.type === "video" && (
          <div className="flex flex-col gap-1 mt-4">
            <label className="font-semibold">Video Link:</label>
            <input
              type="text"
              name="media"
              value={formData.media}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {isValidVideoLink(formData.media) && (
              <iframe
                // src={convertToEmbedLink(formData.media)}
                src={formData.media}
                className="mt-2 w-full h-56 rounded"
                allowFullScreen
                title="Video Preview"
              ></iframe>
            )}
          </div>
        )}

        {formData.type === "image" && (
          <div className="flex flex-col gap-1 mt-4">
            <label className="font-semibold">Cover Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-700 dark:text-gray-300"
            />
            {/* Show image name if preview is not from a File */}
            {typeof formData.image === "string" && formData.image && (
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {/* Selected: {formData.image.split("/").pop()} */}
                Selected: {formData.image}
              </span>
            )}

            {/* Preview image */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-20 w-auto mt-2 rounded border border-gray-300 dark:border-gray-600"
              />
            )}
          </div>
        )}

        {/* Layout */}
        {/* <div className="flex flex-col gap-1">
          <label className="font-semibold">Layout:</label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">Select layout</option>
            {layouts.map((l, i) => (
              <option key={i} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div> */}

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Category:</label>
          <select
            name="category_id"
            value={formData.category_id || ""}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Tags:</label>
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-auto">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={formData.tag_ids.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Content:</label>
          <RichTextEditor
            value={formData.content || content}
            onChange={handleContentChange}
          />
        </div>
      </form>
    </Modal>
  );
};

export default PostForm;
