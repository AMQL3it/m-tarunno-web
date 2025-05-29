import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import coverService from "../../services/coverService";
import postService from "../../services/postService";
import SweetAlert from "../../utils/SweetAlert";

const CoversDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coverData, setCoverData] = useState({
    navbar: [],
    story: [],
    covergrid: [],
    breaking: [],
    suggestions: [],
  });

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postRes, categoryRes, coverRes] = await Promise.all([
        postService.getAll(),
        categoryService.getAll(),
        coverService.getAll(),
      ]);

      const getContent = (name) =>
        coverRes.data.find((item) => item.name === name)?.content || [];

      setCoverData({
        navbar: getContent("navbar"),
        story: getContent("story"),
        covergrid: getContent("covergrid"),
        breaking: getContent("breaking"),
        suggestions: getContent("suggestions"),
      });

      setPosts(postRes.data);
      setCategories(categoryRes.data);
    } catch (err) {
      console.error("Error loading homepage data", err);
      toast.error("Failed to load cover data");
    }
  };

  const toggleId = (key, id) => {
    setCoverData((prev) => {
      const updated = { ...prev };
      // if (key === "covergrid") return prev;

      const current = [...updated[key]];

      if (current.includes(id)) {
        updated[key] = current.filter((i) => i !== id);
      } else {
        const limits = {
          navbar: 7,
          story: 5,
          breaking: 10,
          suggestions: 4,
          covergrid: 4,
        };
        if (current.length >= limits[key]) {
          toast.warning(`Only ${limits[key]} items allowed in ${key}`);
        } else {
          current.push(id);
          updated[key] = current;
        }
      }

      return updated;
    });
  };

  const handleSectionUpdate = async (key, id, content) => {
    try {
      const payload = { name: key, content };
      await coverService.update(id, payload);
      toast.success("Covers updated successfully!");
      SweetAlert.successAlert("Covers updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes.");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-4">
      {/* Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Section
            title="Navbar (Max 7)"
            onSubmit={() => handleSectionUpdate("navbar", 1, coverData.navbar)}
          >
            {categories.map((cat) => (
              <CheckboxItem
                key={cat.id}
                label={cat.name}
                checked={coverData.navbar.includes(cat.id)}
                onChange={() => toggleId("navbar", cat.id)}
              />
            ))}
          </Section>
        </div>

        <Section
          title="Story (Max 5)"
          onSubmit={() => handleSectionUpdate("story", 2, coverData.story)}
        >
          {posts.map((post) => (
            <CheckboxItem
              key={post.id}
              label={post.title}
              checked={coverData.story.includes(post.id)}
              onChange={() => toggleId("story", post.id)}
            />
          ))}
        </Section>

        <Section
          title="Breaking (Max 10)"
          onSubmit={() =>
            handleSectionUpdate("breaking", 5, coverData.breaking)
          }
        >
          {posts.map((post) => (
            <CheckboxItem
              key={post.id}
              label={post.title}
              checked={coverData.breaking.includes(post.id)}
              onChange={() => toggleId("breaking", post.id)}
            />
          ))}
        </Section>

        <Section
          title="Suggestions (Max 4)"
          onSubmit={() =>
            handleSectionUpdate("suggestions", 4, coverData.suggestions)
          }
        >
          {posts.map((post) => (
            <CheckboxItem
              key={post.id}
              label={post.title}
              checked={coverData.suggestions.includes(post.id)}
              onChange={() => toggleId("suggestions", post.id)}
            />
          ))}
        </Section>

        <Section
          title="Cover Grid (Max 4)"
          onSubmit={() =>
            handleSectionUpdate("covergrid", 3, coverData.covergrid)
          }
        >
          {posts.map((post) => (
            <CheckboxItem
              key={post.id}
              label={post.title}
              checked={coverData.covergrid.includes(post.id)}
              onChange={() => toggleId("covergrid", post.id)}
            />
          ))}
        </Section>

        {/* <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2">
            Cover Grid (1 Category, 4 Posts)
          </h2>
          <label className="block mb-2">Choose Category</label>
          <select
            className="w-full p-2 mb-2 rounded text-black dark:text-white bg-white dark:bg-gray-700"
            value={coverData.covergrid.categoryId || ""}
            onChange={(e) => handleCoverGrid(parseInt(e.target.value))}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {coverData.covergrid.categoryId && (
            <div className="h-40 overflow-y-auto pr-2">
              {posts
                .filter((p) => p.categoryId === coverData.covergrid.categoryId)
                .map((post) => (
                  <CheckboxItem
                    key={post.id}
                    label={post.headline}
                    checked={coverData.covergrid.postIds.includes(post.id)}
                    onChange={() => {
                      const postIds = [...coverData.covergrid.postIds];
                      const index = postIds.indexOf(post.id);
                      if (index > -1) postIds.splice(index, 1);
                      else if (postIds.length < 4) postIds.push(post.id);
                      else toast.warning("Only 4 posts allowed in Cover Grid");
                      setCoverData({
                        ...coverData,
                        covergrid: {
                          ...coverData.covergrid,
                          postIds,
                        },
                      });
                    }}
                  />
                ))}
            </div>
          )}
        </div> */}
      </div>

      {/* Save Button */}
      {/* <div className="text-right">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div> */}
    </div>
  );
};

const Section = ({ title, children, onSubmit }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <div className="h-40 overflow-y-auto pr-2 custom-scrollbar">{children}</div>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={onSubmit}
    >
      Submit
    </button>
  </div>
);

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

export default CoversDashboard;
