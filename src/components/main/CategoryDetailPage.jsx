import React from "react";
import { useBlog } from "../../context/BlogContext";
import { useNavigate, useParams } from "react-router";
import Loading from "../loading/Loading";

const CategoryDetailPage = () => {
  const { blog = [], loading, error } = useBlog();
  const { categoryName } = useParams();
  const filteredBlogs = blog.filter((b) => b.categoryName === categoryName);
  const navigate = useNavigate();
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

  return (
    <div className="container mx-auto px-4 py-8 p-5">
      <h1 className="text-4xl font-bold  text-aqua mb-10 "> {categoryName}</h1>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      {filteredBlogs.length === 0 && !loading && (
        <p>No blogs found in this category.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {filteredBlogs.map((item, index) => (
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
                {item.categoryName }
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
        ))}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
