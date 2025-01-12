import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e]">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
