import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/routes";
import Sidebar from "../SideBar/Sidebar";
import Header from "../Header/Header";

const Layout = () => {
  const location = useLocation();

  const noSidebarRoutes = [
    "/LogIn/Mail",
    "/LogIn",
    "/LogIn/Otp",
    "/SignUp",
    "/SignUp/ChooseRole",
  ];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {showSidebar && <Header className="w-full" />}
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 p-4 `}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default Layout;
