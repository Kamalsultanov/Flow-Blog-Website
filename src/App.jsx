import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
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
import { CategoryProvider } from "./Context/CategoryContext";
import { TagProvider } from "./Context/TagContext";

const App = () => {
  return (
    <BrowserRouter>
      <CategoryProvider>
        <TagProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-blog" element={<Blog />} />
              <Route path="category" element={<Category />} />
              <Route path="tags" element={<Tag />} />
              <Route path="social-media" element={<Social />} />
            </Route>
          </Routes>
        </TagProvider>
      </CategoryProvider>
    </BrowserRouter>
  );
};

export default App;
