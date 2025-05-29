import { FaPlus } from "react-icons/fa";

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--header-body-hover-color)] text-[floralwhite] hover:bg-[var(--header-body-color)] transition-all duration-500"
    >
      <FaPlus title="Add New" />
    </button>
  );
};

export default AddButton;
