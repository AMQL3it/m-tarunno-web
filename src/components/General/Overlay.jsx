const Overlay = ({ children }) => {
  return (
    <div className="absolute bottom-0 w-[calc(100%-10px)] bg-gradient-to-t from-black/80 to-transparent text-white p-4">
      {children}
    </div>
  );
};

export default Overlay;
