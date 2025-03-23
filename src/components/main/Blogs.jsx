import React from "react";
import { useBlog } from "../../context/BlogContext";

const Blogs = () => {
  const { blog } = useBlog();


  const truncateHtml = (html, maxLength = 100) => {
    if (!html) return "";
    
    const plainText = html.replace(/<[^>]*>/g, '');
    
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };
  
  return (
    <section className="max-w-screen-xl mx-auto md:flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3">
        {blog.map((item, index) => {
          return (
            <div key={index} className="bg-white shadow-lg  min-h-[400px]">
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
                <h1 className="font-bold text-xl mt-2 capitalize">{item.title}</h1>
                <div
                  className="text-gray-500 text-sm mt-2 overflow-hidden break-words line-clamp-4"
                >
                  {truncateHtml(item.description)}
                </div>
                <button className="bg-aqua text-white px-4 py-2 mt-4 ">
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full mx-auto bg-white mt-10 p-2 md:w-[50%] md:mx-3 md:mt-0 md:max-h-screen shadow-md md:sticky right-0 top-0">
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
            <li className="flex border-y py-3">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">
                  interior
                </span>
                <h5 className="text-gray-500">Title</h5>
              </div>
              <img
                src="https://picsum.photos/400/200"
                alt=""
                className="w-1/3"
              />
            </li>
            <li className="flex border-y py-3">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">
                  interior
                </span>
                <h5 className="text-gray-500">Title</h5>
              </div>
              <img
                src="https://picsum.photos/400/200"
                alt=""
                className="w-1/3"
              />
            </li>
            <li className="flex border-y py-3">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">
                  interior
                </span>
                <h5 className="text-gray-500">Title</h5>
              </div>
              <img
                src="https://picsum.photos/400/200"
                alt=""
                className="w-1/3"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
