import React, { useEffect, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { FaHashtag, FaCheck } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { useTag } from "../../context/TagContext";
import { useBlog } from "../../context/BlogContext";
import { useCategory } from "../../context/CategoryContext";
import { useSocial } from "../../context/SocialContext";

const DashBoard = () => {
  const { blog } = useBlog();
  const { tags } = useTag();
  const { categories } = useCategory();

  const blogCount = blog.length;
  const tagCount = tags.length;
  const categoryCount = categories.length;

  return (
    <section className="gap-4 p-10 flex-wrap bg-onyx w-full min-h-screen">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center">
          <div className="w-full h-60">
            <div className="bg-gradient-to-r from-red-700 w-full h-full to-red-600 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
              <TiDocumentText className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500" />
              <h3 className="mt-7 font-semibold text-white">Blog Count:</h3>
              <span className="text-white text-6xl mt-3">{blogCount}</span>
            </div>
          </div>

          <div className="w-full h-60">
            <div className="bg-gradient-to-r from-yellow-600 w-full h-full to-yellow-400 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
              <FaHashtag className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:-bottom-0 group-hover:opacity-100 mx-auto transition-all duration-500" />
              <h3 className="mt-7 font-semibold text-white">Tag Count:</h3>
              <span className="text-white text-6xl mt-3">{tagCount}</span>
            </div>
          </div>

          <div className="w-full h-60">
            <div className="bg-gradient-to-r from-blue-700 w-full h-full to-blue-400 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
              <TbCategoryFilled className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:-bottom-0 group-hover:opacity-100 mx-auto transition-all duration-500" />
              <h3 className="mt-7 font-semibold text-white">Category Count:</h3>
              <span className="text-white text-6xl mt-3">{categoryCount}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
