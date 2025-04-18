import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/LoginRegister/SignIn";
import SignUp from "../../pages/LoginRegister/signUp";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MusicShare from "../../pages/MusicShare/MusicShare";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SongDetails from "../../pages/SongDetails/SongDetails";

export default function Routing() {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/members/dash")
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="members" element={<ProtectedRoute />}>
            <Route path="dash" element={<Dashboard />} />
            <Route path="music" element={<MusicShare />} />
            <Route path="claim" element={<SongDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
