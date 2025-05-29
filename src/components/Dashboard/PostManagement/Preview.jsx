import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default function Preview() {
  const [content, setContent] = useState("");

  return (
    <div className="max-w-3xl mx-auto mt-3 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">📝 Write News</h1>

      <RichTextEditor value={content} onChange={setContent} />

      {/* Preview Section */}
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold mb-2 text-gray-600">Live Preview:</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
