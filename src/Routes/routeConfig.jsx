import Home from "../pages/home/home.jsx";
import Otp from "../pages/auth/Otp/Otp.jsx";
import SignUp from "../pages/auth/SignUp/SignUp.jsx";
import Role from "../pages/auth/SignUp/Role.jsx";
import LoginByMail from "../pages/auth/LognIn/LoginByEmail.jsx";
import ForgotPassword from "../pages/auth/LognIn/ForgotPassword.jsx";
import ProjectDetails from "../pages/Projects/ProjectDetails/ProjectDetails.jsx";
import AddProject from "../pages/Projects/AddProject/AddProject.jsx";
import AddTask from "../pages/Tasks/AddTask/AddTask.jsx";
import TasksPerProject from "../pages/Tasks/TasksPerProject/TasksPerProject.jsx";
import CreateTag from "../pages/setting/Tags/CreateTag.jsx";
import TaskDetails from "../pages/Tasks/TaskDetails/TaskDetails.jsx";
import CreateCompany from "../pages/auth/company/createCompany.jsx";
import Profile from "../pages/setting/Profile/Profile.jsx";
import Setting from "../pages/setting/setting.jsx";
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
import PerformanceEvaluation from "../pages/setting/Profile/PerformanceEvaluation.jsx";
import ProjectTeam from "../pages/Projects/ProjectTeam/ProjectTeam.jsx";
import Notifications from "../pages/Notifications/Notifications.jsx";
import LoginByPhone from "../pages/auth/LognIn/LoginByPhone.jsx";
import Landing from "../pages/landing/landing.jsx";

// Define public routes
export const publicRoutes = [
  { path: "/landing/*", component: <Landing /> },
  { path: "/LogIn", component: <LoginByPhone /> },
  { path: "/LogIn/Mail", component: <LoginByMail /> },
  { path: "/forgotPassword", component: <ForgotPassword /> },
  { path: "/Otp", component: <Otp /> },
  { path: "/SignUp", component: <SignUp /> },
  { path: "/SignUp/ChooseRole", component: <Role /> },
  { path: "/SignUp/createCompany", component: <CreateCompany /> },
  { path: "/ContactUs", component: <ContactUs /> },
];

// Define protected routes
export const protectedRoutes = [
  { path: "/", component: <Home /> },
  { path: "/Settings/Profile", component: <Profile /> },
  { path: "/Settings", component: <Setting /> },
  { path: "/ProjectDetails/:id", component: <ProjectDetails /> },
  { path: "/Projects", component: <ProjectHistory /> },
  { path: "/TaskDetails/:id", component: <TaskDetails /> },
  { path: "/AddProject", component: <AddProject /> },
  { path: "/AddTask/:ProjectId", component: <AddTask /> },
  { path: "/Project/Tasks/:id", component: <TasksPerProject /> },
  { path: "/SubTasks/:id", component: <AllSubTasks /> },
  { path: "/createTag", component: <CreateTag /> },
  { path: "/Models", component: <Models /> },
  { path: "/DriveFiles", component: <DriveFiles /> },
  { path: "/DriveFiles/Tag/:TagName", component: <FilesPerTag /> },
  { path: "/Inbox", component: <Inbox /> },
  { path: "/Requests/RequestForMaterial", component: <RequestForMaterial /> },
  {
    path: "/Requests/RequestForDocumentSubmittal",
    component: <RequestForDocumentSubmittal />,
  },
  { path: "/Requests/WorkRequest", component: <WorkRequest /> },
  {
    path: "/Requests/RequestForInspection",
    component: <RequestForInspection />,
  },
  { path: "/Requests/TableOfQuantities", component: <TableOfQuantities /> },
  { path: "/Team", component: <Team /> },
  { path: "/SeePlans", component: <SeePlans /> },
  { path: "/PlansInfo", component: <PlansInfo /> },
  { path: "/PlanDetails", component: <PlanDetails /> },
  { path: "/Payments", component: <Payments /> },
  { path: "/PerformanceEvaluation", component: <PerformanceEvaluation /> },
  { path: "/ProjectTeam", component: <ProjectTeam /> },
  { path: "/Notifications", component: <Notifications /> },
];
