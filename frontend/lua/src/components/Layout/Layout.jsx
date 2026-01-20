import * as React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Background from "../Background/Background";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Background />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
