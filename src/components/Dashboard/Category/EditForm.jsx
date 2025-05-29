import Modal from "../../General/Modal";

const EditForm = ({
  title,
  formData,
  handleInputChange,
  handleSubmit,
  setIsModalOpen,
  editingId,
}) => {
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      status="form"
      title={editingId ? `Edit ${title}` : `Add ${title}`}
    >
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter category name"
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter category description"
            rows="3"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Layout:
          </label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select layout</option>
            <option value="YouTubeDisplay">YouTubeDisplay</option>
            <option value="GalleryDisplay">GalleryDisplay</option>
            <option value="FoodDisplay">FoodDisplay</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default EditForm;
