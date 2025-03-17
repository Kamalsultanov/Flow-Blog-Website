import React, { useState } from "react";

const Category = () => {
  return (
    <section className="p-10 bg-onyx w-[80%] text-white">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="flex flex-col mt-6">
        <h3 className="text-lg font-medium">Create a New Category</h3>
        <div className="flex items-center mt-5 space-x-3">
          <input
            type="text"
            name="category"
            id="category"
            className="w-1/2 py-2 px-4  border border-gray-300 text-black focus:outline focus:aqua"
            placeholder="Enter category name"
          />
          <button className=" text-white w-14 h-12 rounded- text-2xl flex items-center justify-center  focus:outline-none bg-aqua">
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
