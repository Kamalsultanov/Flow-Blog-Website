import React from "react";
import { Link } from "react-router";
import { IoMdPerson } from "react-icons/io";

const Sidebar = () => {
  return (
    <section className="min-h-screen bg-matte  min-w-[20%] sticky flex   flex-col items-center    ">
      <div className=" text-slate-800 mt-10 bg-gray-200 w-full h-20   flex items-center    ">
        <IoMdPerson className="w-8 h-8" />
        <h3 className="text-slate-800 text-2xl mx-3 font-semibold">Admin</h3>
      </div>

      <ul className="text-white text-2xl py-4 font-semibold  w-full ">
        <li className="  px-3 py-2    hover:text-aqua">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className=" px-3 py-2  hover:text-aqua">
          <Link to="/admin/create-blog" className="w-full h-ful"> Blog</Link>
        </li>
        <li className=" px-3 py-2   hover:text-aqua">
          <Link to="/admin/category">Category</Link>
        </li>
        <li className=" px-3 py-2    hover:text-aqua">
          <Link to="/admin/tags">Tag</Link>
        </li>
        <li className=" px-3 py-2  hover:text-aqua">
          <Link to="/admin/social-media">Social Media</Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
