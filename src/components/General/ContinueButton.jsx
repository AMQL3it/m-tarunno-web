import { FaArrowAltCircleRight } from "react-icons/fa";

const ContinueButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit bg-[var(--header-body-hover-color)] hover:bg-[var(--header-body-color)] text-[floralwhite] border-none py-2 px-5 rounded cursor-pointer flex items-center gap-2 transition-all duration-500"
    >
      <FaArrowAltCircleRight /> Continue Reading
    </button>
  );
};

export default ContinueButton;
