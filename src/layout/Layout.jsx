import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Hero/Navbar";
import { Outlet } from "react-router";
import ShortAbout from "../components/main/ShortAbout";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
