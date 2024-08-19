import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/home";
import LoginByPhone from "../pages/auth/LognIn/LoginByPhone";
import Otp from "../pages/auth/Otp/Otp";
import SignUp from "../pages/auth/SignUp/SignUp";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/LogIn" element={<LoginByPhone />} />
      <Route path="/LogIn/Otp" element={<Otp />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
