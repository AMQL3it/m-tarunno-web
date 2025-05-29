import { useState } from "react";

const WriteComment = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ text });
      setText("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 mt-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow"
    >
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg resize-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        disabled={loading}
      ></textarea>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default WriteComment;
