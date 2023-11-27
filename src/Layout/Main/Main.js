import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import TopNav from "../../Shared/TopNav/TopNav";
import BottomNav from "../../Shared/PoftfolioNav/BottomNav";

const Main = () => {
  return (
    <div>
      <TopNav></TopNav>
      <BottomNav></BottomNav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
