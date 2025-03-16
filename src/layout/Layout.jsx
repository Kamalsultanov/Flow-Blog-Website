import React from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/Hero/Navbar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </> 
  )
}

export default Layout