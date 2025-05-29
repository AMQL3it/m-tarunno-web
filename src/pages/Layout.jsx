import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import categoryService from "../services/categoryService";
import coverService from "../services/coverService";
import style from "../styles/Layout.module.css";

const Layout = () => {
  const [navlist, setNavlist] = useState([]);
  useEffect(() => {
    getCoverInfo();
  }, []);

  const getCoverInfo = async () => {
    try {
      const [categoryRes, coverRes] = await Promise.all([
        categoryService.getAll(),
        coverService.getAll(),
      ]);

      // console.log(coverRes.data);

      const catlist = coverRes.data.filter((item) => item.name === "navbar")[0]
        .content;

      // const story = await coverService.update(2, { content: [6, 7, 3] });
      // console.log(story);
      // const grid = await coverService.update(3, { content: [2, 4, 5, 8] });
      // console.log(grid);
      // const suggested = await coverService.update(4, { content: [2, 6, 7, 8] });
      // console.log(suggested);
      // const breaking = await coverService.update(5, {
      //   content: [2, 3, 4, 5, 6, 7, 8],
      // });
      // console.log(breaking);

      const navs = categoryRes.data
        .filter((item) => catlist.includes(item.id))
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
          };
        });
      setNavlist(navs);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={style.layout}>
      <Header />
      <Navbar navlist={navlist} />
      <Outlet />
      <Footer navlist={navlist} />
    </div>
  );
};

export default Layout;
