import React, { useEffect, useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { Navigate, useNavigate } from "react-router";
import Skeletonloader from "../loading/Skeletonloader";
import ShortAbout from "./ShortAbout";

const Blogs = () => {
  const { blog } = useBlog();
  const navigate = useNavigate();
  const [popularPosts, setPopularPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blog && blog.length > 0) {
      setPopularPosts(blog.slice(0, 3));
      setLoading(false);
    }
  }, [blog]);

  const navigateToDetail = (id) => {
    navigate(`/blog/${id}`);
  };

  const truncateHtml = (html, maxLength = 100) => {
    if (!html) return "";

    const plainText = html.replace(/<[^>]*>/g, "");

    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  if (loading) {
    return (
      <section className="max-w-screen-xl mx-auto md:flex">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3 flex-1">
          <div>
            <Skeletonloader />
          </div>
          <div>
            <Skeletonloader />
          </div>
          <div>
            <Skeletonloader />
          </div>
          <div>
            <Skeletonloader />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-11/12   mx-auto md:flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-2/3 gap-6 mx-3">
        {blog.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-lg  min-h-[440px] hover:scale-105 transition-all   duration-500"
            >
              <div className="h-1/2">
                <img
                  src={`${import.meta.env.VITE_API_URL_IMAGE}${item.imgUrl}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 h-1/2">
                <span className="text-aqua font-bold uppercase text-sm truncate">
                  {item.categoryName || "Category"}
                </span>
                <h1 className="font-bold text-xl mt-2 uppercase">
                  {item.title}
                </h1>
                <div className="text-gray-500 text-sm mt-2 overflow-hidden break-words line-clamp-1 uppercase">
                  {truncateHtml(item.description)}
                </div>
                <button
                  className="bg-aqua text-white px-4 py-2 mt-4 "
                  onClick={() => navigateToDetail(item.id)}
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ShortAbout />
    </section>
  );
};

export default Blogs;
