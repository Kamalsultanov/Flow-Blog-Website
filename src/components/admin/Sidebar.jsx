import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { IoMdPerson } from "react-icons/io";
import { FaHome, FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="relative">
      <section
        className={`min-h-screen bg-matte fixed z-40 left-0 top-0 w-44 md:w-60 flex flex-col items-center ${
          isSidebarOpen ? "left-0" : "-left-44 md:-left-60"
        } transition-all duration-300`}
      >
        <div className="p-5 mt-10 bg-aqua text-white w-full h-20 flex items-center">
          <IoMdPerson className="w-8 h-8" />
          {isSidebarOpen && (
            <h3 className="text-2xl mx-3 font-semibold">Admin</h3>
          )}
        </div>

        <ul className="text-white text-2xl py-4 font-semibold w-full">
          <li
            className={`px-3 py-2 border-b border-gray-500 ${
              location.pathname === "/admin" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/admin">Dashboard</Link>
          </li>
          <li
            className={`px-3 py-2 border-b border-gray-500 ${
              location.pathname === "/admin/create-blog" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/admin/create-blog">Create Blog</Link>
          </li>
          <li
            className={`px-3 py-2 border-b border-gray-500 ${
              location.pathname === "/admin/category" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/admin/category">Categories</Link>
          </li>
          <li
            className={`px-3 py-2 border-b border-gray-500 ${
              location.pathname === "/admin/tags" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/admin/tags">Tags</Link>
          </li>
          <li
            className={`px-3 py-2 border-b border-gray-500 ${
              location.pathname === "/admin/blog-list" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/admin/blog-list">Existing Blogs</Link>
          </li>
          <li
            className={`px-3 py-2 border-b border-gray-500 flex ${
              location.pathname === "/" ? "bg-aqua text-white" : "hover:text-aqua"
            }`}
          >
            <Link to="/" className="flex items-center">
              <FaHome />
              {isSidebarOpen && <span className="px-2">Home</span>}
            </Link>
          </li>
        </ul>

        <div
          onClick={toggleSidebar}
          className="absolute top-[80%] bg-matte p-3 z-50 -right-[60px] md:-right-[60px] md:hover:-right-[63px] rounded-r-full transition-all duration-300 cursor-pointer"
        >
          <FaArrowRight
            className={`w-10 h-10 text-halfwhite transition-all duration-300 ${
              isSidebarOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </section>
    </section>
  );
};

export default Sidebar;
