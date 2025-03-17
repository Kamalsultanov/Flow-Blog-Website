import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin-token", "secureToken");
      navigate("/admin");
    } else {
      setError("FAILED");
    }
  };

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
            className="outline-none    bg-light  shadow-md border border-black     w-full rounded-lg h-12 px-2 placeholder:text-sm placeholder:text-gray-400
             focus:bg-gray-50 focus:outline focus:outline-aqua focus:border-none transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className=" w-full rounded-lg h-12 px-2 mt-10 relative peer  transition-all">
          <label htmlFor="username" className="absolute -top-6 text-sm ">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="outline-none    bg-light  shadow-md border border-black     w-full rounded-lg h-12 px-2 placeholder:text-sm placeholder:text-gray-400
             focus:bg-gray-50 focus:outline focus:outline-aqua focus:border-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-10 bg-aqua rounded-md text-white py-2 hover:shadow-lg transition-all"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
