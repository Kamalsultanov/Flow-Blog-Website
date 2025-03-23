import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/admin/Sidebar";
import { TagProvider } from "../context/TagContext";
import { CategoryProvider } from "../context/CategoryContext";

const AdminLayout = () => {
  return (
    <>
      <CategoryProvider>
        <TagProvider>
          <section className="flex">
            <Sidebar />
            <Outlet />
          </section>
        </TagProvider>
      </CategoryProvider>
    </>
  );
};

export default AdminLayout;
