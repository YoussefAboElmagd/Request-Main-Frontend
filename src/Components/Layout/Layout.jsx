import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/routes";
import Sidebar from "../SideBar/Sidebar";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";


const Layout = () => {
  const location = useLocation();
  const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const noSidebarRoutes = [
    "/LogIn/Mail",
    "/LogIn",
    "/Otp",
    "/SignUp",
    "/SignUp/ChooseRole",
    "/SignUp/createCompany",
    "/forgotPassword",
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
      <ToastContainer options={options} stacked />
    </div>
  );
};

export default Layout;
