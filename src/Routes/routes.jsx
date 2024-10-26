import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/home.jsx";
import LoginByPhone from "../pages/auth/LognIn/LoginByPhone";
import Otp from "../pages/auth/Otp/Otp";
import SignUp from "../pages/auth/SignUp/SignUp";
import Role from "../pages/auth/SignUp/Role";
import LoginByMail from "../pages/auth/LognIn/LoginByEmail";
import ProjectDetails from "../pages/Projects/ProjectDetails/ProjectDetails";
import AddProject from "../pages/Projects/AddProject/AddProject";
import AddTask from "../pages/Tasks/AddTask/AddTask";
import TasksPerProject from "../pages/Tasks/TasksPerProject/TasksPerProject";
import CreateTag from "../pages/setting/Tags/CreateTag.jsx";
import TaskDetails from "../pages/Tasks/TaskDetails/TaskDetails";
import CreateCompany from "../pages/auth/company/createCompany";
import ForgotPassword from "../pages/auth/LognIn/ForgotPassword";
import Profile from "../pages/setting/Profile/Profile.jsx";
import Setting from "../pages/setting/setting";
import ContactUs from "../pages/contactUs/ContactUs.jsx";
import ProjectHistory from "../pages/Projects/ProjectHistory/ProjectHistory.jsx";
import Team from "../pages/Team/Team.jsx";
import DriveFiles from "../pages/DriveFiles/DriveFiles.jsx";
import RequestForMaterial from "../pages/Requests/RequestForMaterial.jsx";
import FilesPerTag from "../pages/DriveFiles/FilesPerTag.jsx";
import Models from "../pages/Requests/Models/Models.jsx";
import RequestForDocumentSubmittal from "../pages/Requests/RequestForDocumentSubmittal.jsx";
import WorkRequest from "../pages/Requests/WorkRequest.jsx";
import RequestForInspection from "../pages/Requests/RequestForInspection.jsx";
import TableOfQuantities from "../pages/Requests/TableOfQuantities/TableOfQuantities.jsx";
import Inbox from "../pages/Inbox/Inbox.jsx";
import SeePlans from "../pages/Plans/SeePlans.jsx";
import PlansInfo from "../pages/Plans/PlansInfo.jsx";
import PlanDetails from "../pages/Plans/PlanDetails.jsx";
import Payments from "../pages/Payments/Payments.jsx";
import AllSubTasks from "../pages/Tasks/AllSub/AllSubTasks.jsx";
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/LogIn" element={<LoginByPhone />} />
      <Route path="/LogIn/Mail" element={<LoginByMail />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/Otp" element={<Otp />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignUp/ChooseRole" element={<Role />} />
      <Route path="/SignUp/createCompany" element={<CreateCompany />} />
      <Route path="/Settings/Profile" element={<Profile />} />
      <Route path="/Settings" element={<Setting />} />
      <Route path="/ProjectDetails/:id" element={<ProjectDetails />} />
      <Route path="/Projects" element={<ProjectHistory />} />
      <Route path="/TaskDetails/:id" element={<TaskDetails />} />
      <Route path="/AddProject" element={<AddProject />} />
      <Route path="/AddTask/:ProjectId" element={<AddTask />} />
      <Route path="/Project/Tasks/:id" element={<TasksPerProject />} />
      <Route path="/SubTasks/:id" element={<AllSubTasks />} />
      <Route path="/createTag" element={<CreateTag />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Models" element={<Models />} />
      <Route path="/DriveFiles" element={<DriveFiles />} />
      <Route path="/DriveFiles/Tag/:TagName" element={<FilesPerTag />} />
      <Route path="/Inbox" element={<Inbox />} />
      <Route
        path="/Requests/RequestForMaterial"
        element={<RequestForMaterial />}
      />
      <Route
        path="/Requests/RequestForDocumentSubmittal"
        element={<RequestForDocumentSubmittal />}
      />
      <Route path="/Requests/WorkRequest" element={<WorkRequest />} />
      <Route
        path="/Requests/RequestForInspection"
        element={<RequestForInspection />}
      />
      <Route
        path="/Requests/TableOfQuantities"
        element={<TableOfQuantities />}
      />
      <Route path="/Team" element={<Team />} />
      <Route path="/SeePlans" element={<SeePlans />} />
      <Route path="/PlansInfo" element={<PlansInfo />} />
      <Route path="/PlanDetails" element={<PlanDetails />} />
      <Route path="/Payments" element={<Payments />} />
    </Routes>
  );
};

export default AppRoutes;
