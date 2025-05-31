import { useEffect, useState } from "react";

import BreakingNews from "../../components/BreakingNews";
import CoverSection from "../../components/CoverSection/CoverSection";
import FoodDisplay from "../../components/FoodDisplay";
import GalleryDisplay from "../../components/GalleryDisplay";
import YouTubeDisplay from "../../components/YouTubeDisplay";

import categoryService from "../../services/categoryService";
import coverService from "../../services/coverService";
import postService from "../../services/postService";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [breaking, setBreaking] = useState([]);
  const [coverInfo, setCoverInfo] = useState({
    story: [],
    grid: [],
    suggested: [],
  });

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

      const storylist = coverRes.data.filter((item) => item.name === "story")[0]
        .content;

      const gridlist = coverRes.data.filter(
        (item) => item.name === "covergrid"
      )[0].content;

      const suggestedlist = coverRes.data.filter(
        (item) => item.name === "suggestions"
      )[0].content;

      const breakinglist = coverRes.data.filter(
        (item) => item.name === "breaking"
      )[0].content;

      setCoverInfo({
        story: postRes.data.filter((item) => storylist.includes(item.id)),
        grid: postRes.data.filter((item) => gridlist.includes(item.id)),
        suggested: postRes.data.filter((item) =>
          suggestedlist.includes(item.id)
        ),
      });

      setBreaking(
        postRes.data.filter((item) => breakinglist.includes(item.id))
      );

      const latestPosts = postRes.data;
      setPosts(latestPosts);
      setCategories(categoryRes.data || []);
    } catch (err) {
      console.error("Error loading homepage data", err);
    }
  };

  const renderComponentByLayout = (category, layout, posts) => {
    switch (layout) {
      case "YouTubeDisplay":
        return <YouTubeDisplay category={category} allposts={posts} />;
      case "FoodDisplay":
        return <FoodDisplay category={category} allposts={posts} />;
      case "GalleryDisplay":
        return <GalleryDisplay category={category} allposts={posts} />;
      default:
        return null;
    }
  };

  return (
    <>
      <BreakingNews bnews={breaking} />
      <CoverSection coverInfo={coverInfo} />
      {/* <SuggestedNewsCards suggestedNews={coverInfo.suggested} /> */}

      {categories.map((category) => {
        const filteredPosts = posts.filter(
          (post) => post.category_id === category.id
        );
        if (filteredPosts.length === 0) return null;

        return (
          <div key={category.id} className="mb-6">
            {/* <h2 className="text-2xl font-bold mb-4">{category.name}</h2> */}
            {renderComponentByLayout(
              category.name,
              category.layout,
              filteredPosts
            )}
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
