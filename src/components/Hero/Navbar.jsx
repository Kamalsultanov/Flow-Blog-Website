import React from "react";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="flex justify-between  h-14 shadow-lg  ">
      <ul className="flex h-full">
        <li className="nav-list ">Home</li>
        <li className="nav-list ">Home</li>
        <li className="nav-list ">Home</li>
      </ul>
      <ul className="flex h-full">
        <li className="nav-list ">
          <FaPinterestP  />
        </li>
        <li className="nav-list ">
          <FaInstagram />
        </li>
        <li className="nav-list ">
          <FaGithub />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
