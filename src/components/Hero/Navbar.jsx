import React from "react";
import { FaPinterestP, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="flex justify-between h-14 shadow-lg">
      <nav  className="flex justify-between w-full md:max-w-screen-xl mx-auto"> 
        <ul className="flex h-full">
          <li className="nav-list">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul className="flex h-full">
          <li className="nav-list">
            <Link to="https://www.pinterest.com">
              <FaPinterestP />
            </Link>
          </li>
          <li className="nav-list">
            <Link to="https://www.instagram.com">
              <FaInstagram />
            </Link>
          </li>
          <li className="nav-list">
            <Link to="https://www.github.com">
              <FaGithub />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
