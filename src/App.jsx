import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import AdminRoute from "./components/route-component/admin-route";
import Blog from "./components/admin/Blog";
import Category from "./components/admin/Category";
import Tag from "./components/admin/Tag";
import Social from "./components/admin/Social";
import BlogList from "./components/admin/BlogList";
import About from "./components/main/About";
import DashBoard from "./components/admin/DashBoard";
import { BlogProvider } from "./context/BlogContext";

import BlogDetailPage from "./components/main/BlogDetailPage.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import CategoryDetailPage from "./components/main/CategoryDetailPage.jsx";
import { SocialProvider } from "./context/SocialContext.jsx";
import NotFound from "./components/notfound/NotFound.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <SocialProvider>
        <CategoryProvider>
          <BlogProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route
                  path="/category/:categoryName"
                  element={<CategoryDetailPage />}
                />
              </Route>
              <Route path="/admin-login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<DashBoard />} />

                <Route path="create-blog" element={<Blog />} />
                <Route path="category" element={<Category />} />
                <Route path="tags" element={<Tag />} />
                <Route path="social-media" element={<Social />} />
                <Route path="blog-list" element={<BlogList />} />
              </Route>
            </Routes>
          </BlogProvider>
        </CategoryProvider>
      </SocialProvider>
    </BrowserRouter>
  );
};

export default App;
