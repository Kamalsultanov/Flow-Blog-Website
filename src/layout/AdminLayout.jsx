import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/admin/Sidebar'

const AdminLayout = () => {
  return (
    <>
      <section className='flex'>
      <Sidebar/>
      <Outlet/>
      </section>
      </>
)
}

export default AdminLayout