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
      <form
        className="space-y-6 px-2 py-1 sm:px-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter tag name"
            required
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter tag description"
            rows="3"
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </form>
    </Modal>
  );
};

export default EditForm;
