import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import AdminRoute from "./components/route-component/admin-route";
import Dashboard from "./components/admin/DashBoard";
import Blog from "./components/admin/Blog";
import Category from "./components/admin/Category";
import Tag from "./components/admin/Tag";
import Social from "./components/admin/Social";
import BlogList from "./components/admin/BlogList";
import { BlogProvider } from "./context/BlogContext";
import About from "./components/main/About";

const App = () => {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/admin-login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="create-blog" element={<Blog />} />
            <Route path="category" element={<Category />} />
            <Route path="tags" element={<Tag />} />
            <Route path="social-media" element={<Social />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="/admin/dashboard" element={<Navigate to="/admin" />} />
          </Route>
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
};

export default App;
