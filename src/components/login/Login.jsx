import React from "react";

const Login = () => {
  return (
    <section className="w-full h-screen bg-light flex justify-center items-center">
      <div className="bg-white h-3/6 p-4 text-2xl font-semibold rounded-md shadow-lg">
        <h1 className="underline">Login to System</h1>

        <div className=" w-full rounded-lg h-12 px-2 mt-10 relative peer  transition-all">
          <label htmlFor="username" className="absolute -top-6 text-sm ">
            Username
          </label>
          <input
            type="text"
                      id="username"
                      placeholder="Enter Username"
            className="outline-none    bg-light  shadow-md border border-gray-200    w-full rounded-lg h-12 px-2 placeholder:text-sm placeholder:text-gray-400
             focus:bg-gray-50 focus:outline focus:outline-aqua focus:border-none transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
