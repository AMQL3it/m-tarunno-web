import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "color",
  "background",
];

export default function RichTextEditor({ value, onChange }) {
  const [editorContent, setEditorContent] = useState(value || "");

  useEffect(() => {
    setEditorContent(value || "");
  }, [value]);

  const handleChange = (content) => {
    setEditorContent(content);
    if (onChange) onChange(content);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600">
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write your content here..."
        className="min-h-[200px] text-gray-900 dark:text-gray-100"
      />
      <style>
        {`
          /* Dark mode toolbar */
          .dark .ql-toolbar.ql-snow {
            background-color: #1f2937; /* gray-800 */
            border-color: #4b5563; /* gray-600 */
            color: #d1d5db; /* gray-300 */
          }
          .dark .ql-container.ql-snow {
            background-color: #1f2937; /* gray-800 */
            border-color: #4b5563; /* gray-600 */
            color: #d1d5db; /* gray-300 */
          }
          .dark .ql-editor {
            color: #d1d5db; /* gray-300 */
            background-color: #1f2937; /* gray-800 */
          }
          /* Placeholder color in dark mode */
          .dark .ql-editor.ql-blank::before {
            color: #9ca3af; /* gray-400 */
          }
        `}
      </style>
    </div>
  );
}
