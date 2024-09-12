import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/home";
import LoginByPhone from "../pages/auth/LognIn/LoginByPhone";
import Otp from "../pages/auth/Otp/Otp";
import SignUp from "../pages/auth/SignUp/SignUp";
import Role from "../pages/auth/SignUp/Role";
import LoginByMail from "../pages/auth/LognIn/LoginByEmail";
import Profile from "../pages/Profile/Profile";
import ProjectDetails from "../pages/Projects/ProjectDetails/ProjectDetails";
import AddProject from "../pages/Projects/AddProject/AddProject";
import AddTask from "../pages/Tasks/AddTask/AddTask";
import TasksPerProject from "../pages/Tasks/TasksPerProject/TasksPerProject";
import CreateTag from "../pages/Tags/CreateTag";
import TaskDetails from "../pages/Tasks/TaskDetails/TaskDetails";


const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/LogIn" element={<LoginByPhone />} />
      <Route path="/LogIn/Mail" element={<LoginByMail />} />
      <Route path="/LogIn/Otp" element={<Otp />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignUp/ChooseRole" element={<Role />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/ProjectDetails/:id" element={<ProjectDetails />} />
      <Route path="/TaskDetails/:id" element={<TaskDetails />} />
      <Route path="/AddProject" element={<AddProject />} />
      <Route path="/AddTask" element={<AddTask />} />
      <Route path="/Project/Tasks/:id" element={<TasksPerProject />} />
      <Route path="/createTag" element={<CreateTag />} />
    </Routes>
  );
};

export default AppRoutes;
