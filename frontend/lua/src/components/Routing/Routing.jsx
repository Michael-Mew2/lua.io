import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/LoginRegister/SignIn";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MusicShare from "../../pages/MusicShare/MusicShare";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="members" element={<ProtectedRoute />}>
            <Route path="dash" element={<Dashboard />} />
            <Route path="music" element={<MusicShare />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
