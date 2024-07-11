import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
//{ user, logoutHandler }
//user={user} logoutHandler={logoutHandler}
export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
