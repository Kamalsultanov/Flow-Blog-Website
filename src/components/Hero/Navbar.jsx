import React, { useState } from "react";
import { FaPinterestP, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCategory } from "../../context/CategoryContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { categories } = useCategory();
  return (
    <header>
      <section className="flex justify-between h-16 left-0 right-0 z-50 bg-white shadow-md  top-0">
        <nav className="justify-between w-full md:max-w-screen-xl mx-auto hidden md:flex">
          <ul className="flex h-full text-grey">
            <li className="nav-list">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-list">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-list relative group ">
              <span>Category</span>
              <ul className="absolute top-full left-0 bg-white min-w-36 min-h-36 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-lg">
                { categories.map((category) => (
                  <li className="nav-list text-grey capitalize py-1" key={category.id}>
                    <Link to={`/category/${category.name}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="flex h-full">
            <li className="nav-list text-grey">
              <Link to="https://www.pinterest.com">
                <FaPinterestP />
              </Link>
            </li>
            <li className="nav-list text-grey">
              <Link to="https://www.instagram.com">
                <FaInstagram />
              </Link>
            </li>
            <li className="nav-list text-grey">
              <Link to="https://www.github.com">
                <FaGithub />
              </Link>
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
          className={`absolute top-full left-0 w-full bg-white shadow-md overflow-hidden text-grey font-bold transition-all duration-500 ${
            menuOpen ? "h-28 " : "h-0"
          }`}
        >
          <ul className="flex flex-col items-center">
            <li className="p-2" onClick={() => setMenuOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li className="p-2" onClick={() => setMenuOpen(false)}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </section>
      <div className="w-11/12 mx-auto  items-center justify-center mt-5  hidden md:flex">
        <img src="/logo/logo.png" alt="logo" className="h-24" />
      </div>
    </header>
  );
};

export default Navbar;
