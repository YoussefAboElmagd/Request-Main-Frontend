import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/routes";
import Sidebar from "../SideBar/Sidebar";

const Layout = () => {
  const location = useLocation();

  
  const noSidebarRoutes = [
    "/LogIn",
    "/LogIn/Otp",
    "/SignUp",
    "SignUp/ChooseRole",
  ];

  
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      <AppRoutes />
    </>
  );
};

export default Layout;
