import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import Main from "./main/Main";
import Login from "./login/Login";
import AdminRoute from "./route-component/admin-route";
import Dashboard from "./admin/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="/admin-login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
