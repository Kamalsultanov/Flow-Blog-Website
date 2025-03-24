import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/admin/Sidebar";
import { TagProvider } from "../context/TagContext";
import { CategoryProvider } from "../context/CategoryContext";

const AdminLayout = () => {
  return (
    <>
        <TagProvider>
          <section className="flex">
            <Sidebar />
            <Outlet />
          </section>
        </TagProvider>
    </>
  );
};

export default AdminLayout;
