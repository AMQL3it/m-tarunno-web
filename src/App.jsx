// import "react-quill/dist/quill.snow.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Category from "./components/Dashboard/Category";
import PostManagement from "./components/Dashboard/PostManagement";
import Tags from "./components/Dashboard/Tag";
import User from "./components/Dashboard/User";
import NewsCard from "./components/NewsCard";
import NewsFeed from "./components/NewsFeed";
import Dashboard from "./pages/Dashboard";
import ExplorePage from "./pages/ExplorePage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Varification from "./pages/Varification";
import CoversDashboard from "./components/Dashboard/CoversDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exect path="" element={<HomePage />} />
          <Route path="newsfeed" element={<ExplorePage />}>
            <Route index element={<div>Select a category</div>} />
            <Route path=":catId" element={<NewsFeed />} />
            <Route path="news/:newsId" element={<NewsCard />} />
          </Route>

          {/* <Route exect path="news/:newsId" element={<NewsCard />} /> */}
          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/varification" element={<Varification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<CoversDashboard />} />
          <Route path="categories" element={<Category />} />
          <Route path="tags" element={<Tags />} />
          <Route path="posts" element={<PostManagement />} />
          <Route path="users" element={<User />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
