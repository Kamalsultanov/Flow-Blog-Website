import React, { useEffect, useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { Navigate, useNavigate } from "react-router";
import Skeletonloader from "../loading/Skeletonloader";

const Blogs = () => {
  const { blog } = useBlog();
  const navigate = useNavigate();
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (blog && blog.length > 0) {
      setPopularPosts(blog.slice(0, 3));
      setLoading(false); // Set loading to false when blog data is available
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
    <section className="max-w-screen-xl mx-auto md:flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3">
        {blog.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-lg  min-h-[400px] hover:scale-105 transition-all duration-500"
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
                <h1 className="font-bold text-xl mt-2 capitalize">
                  {item.title}
                </h1>
                <div className="text-gray-500 text-sm mt-2 overflow-hidden break-words line-clamp-4">
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

      <div className="w-full mx-auto bg-white mt-10 p-2 md:w-[70%] md:mx-3 md:mt-0 md:min-h-screen shadow-md md:sticky right-0 top-0">
        <h1 className="font-semibold text-2xl m-3">ABOUT ME</h1>
        <div className="w-11/12 mx-auto">
          <img
            src="https://picsum.photos/400/200"
            alt=""
            className="w-full h-full object-cover"
          />
          <p className="text-gray-500 text-sm mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis sed
            optio corrupti odio. Labore repellendus inventore fugiat
            necessitatibus obcaecati, non error nesciunt tempora, asperiores,
            vero eius aliquam veniam officiis!
          </p>
        </div>
        <div className="mt-10">
          <h3 className="border-l-4 border-gray-300 px-2">Popular posts</h3>
          <ul className="w-full my-3 px-3">
            {popularPosts.map((post, index) => (
              <li
                key={index}
                className="flex border-y py-3 hover:scale-105 transition-all duration-500"
                onClick={() => navigateToDetail(post.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-2/3">
                  <span className="text-aqua font-bold uppercase text-sm">
                    {post.categoryName || "Category"}
                  </span>
                  <h5 className="text-gray-500">{post.title}</h5>
                </div>
                <img
                  src={`${import.meta.env.VITE_API_URL_IMAGE}${post.imgUrl}`}
                  alt={post.title}
                  className="w-1/3 object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
