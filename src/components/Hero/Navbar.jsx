import React, { useState } from "react";
import {
  FaPinterestP,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCategory } from "../../context/CategoryContext";
import { useSocial } from "../../context/SocialContext";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryTab, setCategoryTab] = useState(false);
  const { categories } = useCategory();
  const { socialMedia } = useSocial();
  const socialLinks = socialMedia.length > 0 ? socialMedia[0] : {};

  return (
    <header>
      <section className="flex justify-between h-16 left-0 right-0 z-50 bg-white shadow-md top-0">
        <nav className="justify-between w-full md:max-w-screen-xl mx-auto hidden md:flex">
          <ul className="flex h-full text-grey">
            <li className="nav-list">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-list">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-list relative group">
              <span>Category</span>
              <ul className="absolute top-full left-0 bg-white min-w-36 min-h-36 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-lg">
                {categories.map((category) => (
                  <li
                    className="nav-list text-grey capitalize py-1"
                    key={category.id}
                  >
                    <Link to={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="flex h-full">
            {socialLinks.instagramUrl && (
              <li className="nav-list text-grey">
                <a
                  href={socialLinks.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aqua"
                >
                  <FaInstagram />
                </a>
              </li>
            )}
            {socialLinks.twitterUrl && (
              <li className="nav-list text-grey">
                <a
                  href={socialLinks.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aqua"
                >
                  <FaTwitter />
                </a>
              </li>
            )}
            {socialLinks.facebookUrl && (
              <li className="nav-list text-grey">
                <a
                  href={socialLinks.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aqua"
                >
                  <FaFacebookF />
                </a>
              </li>
            )}
            {socialLinks.linkedInUrl && (
              <li className="nav-list text-grey">
                <a
                  href={socialLinks.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aqua"
                >
                  <IoLogoLinkedin />
                </a>
              </li>
            )}
            <li className="nav-list text-grey">
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-aqua"
              >
                <FaPinterestP />
              </a>
            </li>
            <li className="nav-list text-grey">
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-aqua"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:hidden flex items-center justify-center w-11/12 relative">
          <button
            className="absolute left-3 text-grey cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GiHamburgerMenu />
          </button>
          <img src="/logo/logo.png" alt="logo" className="h-10" />
        </div>

        <div
          className={`absolute top-16 z-50 left-0 w-full bg-white shadow-md overflow-hidden text-grey font-bold transition-all
           duration-500 ease-linear  ${menuOpen ? "max-h-96" : "max-h-0"}`}
        >
          <ul className="flex flex-col items-center">
            <li
              className="p-2 hover:bg-aqua w-full flex items-center justify-center hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="p-2 hover:bg-aqua w-full flex items-center justify-center hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/about">About</Link>
            </li>
            <li className="relative group hover:bg-aqua w-full flex items-center justify-center hover:text-white p-2">
              <button
                className="flex items-center"
                onClick={() => setCategoryTab((prev) => !prev)}
              >
                Category <IoIosArrowDown className="ml-2" />
              </button>
            </li>
            <ul
              className={`bg-white flex flex-col overflow-hidden items-center justify-center text-sm w-full transition-all ease-linear duration-300
               ${categoryTab ? "max-h-56" : "max-h-0"}`}
            >
              {categories.map((category) => (
                <li
                  className="text-grey capitalize py-1 hover:bg-aqua p-2 hover:text-white w-full flex justify-center"
                  key={category.id}
                >
                  <Link to={`/category/${category.name}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </section>
      <div className="w-11/12 mx-auto items-center justify-center mt-5 hidden md:flex">
        <img src="/logo/logo.png" alt="logo" className="h-24" />
      </div>
    </header>
  );
};

export default Navbar;
