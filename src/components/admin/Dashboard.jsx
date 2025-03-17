import React from "react";
import { TiDocumentText } from "react-icons/ti";
import { FaHashtag } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Dashboard = () => {

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]; // Example categories

  return (
    <section className=" gap-4 p-10 flex-wrap bg-onyx w-[80%]">
      <div className="flex gap-4 flex-wrap justify-center">
        <div className=" w-[30%] h-60  ">
          <div
            className="bg-gradient-to-r from-red-700 w-full h-full to-red-600
         relative overflow-hidden rounded-md flex  items-center flex-col group shadow-lg"
          >
            <TiDocumentText
              className="w-1/2 h-1/2 text-white opacity-85 absolute  -bottom-8 group-hover:bottom-0
           group-hover:opacity-100 transition-all duration-500   "
            />
            <h3 className="mt-7 font-semibold text-white">Blog Count:</h3>
            <span className="text-white  text-6xl mt-3"> 100</span>
          </div>
        </div>
        <div className=" w-[30%] h-60  ">
          <div
            className="bg-gradient-to-r from-yellow-600 w-full h-full to-yellow-400
         relative overflow-hidden rounded-md flex  items-center flex-col group shadow-lg"
          >
            <FaHashtag
              className="w-1/2
             h-1/2 text-white opacity-85 absolute  -bottom-8 group-hover:-bottom-0
           group-hover:opacity-100 mx-auto transition-all duration-500   "
            />
            <h3 className="mt-7 font-semibold text-white">Tag Count:</h3>
            <span className="text-white  text-6xl mt-3"> 100</span>
          </div>
        </div>
        <div className=" w-[30%] h-60  ">
          <div
            className="bg-gradient-to-r from-blue-700 w-full h-full to-blue-400
         relative overflow-hidden rounded-md flex  items-center flex-col group shadow-lg"
          >
            <FaEye 
              className="w-1/2
             h-1/2 text-white opacity-85 absolute  -bottom-8 group-hover:-bottom-0
           group-hover:opacity-100 mx-auto transition-all duration-500   "
            />
            <h3 className="mt-7 font-semibold text-white"> Count:</h3>
            <span className="text-white  text-6xl mt-3"> 100</span>
          </div>
        </div>
      </div>
      <div className=" bg-gray-400 mt-10 w-11/12 mx-auto">

        <h3 className="text-white">Category</h3>

      </div>
    </section>
  );
};

export default Dashboard;
