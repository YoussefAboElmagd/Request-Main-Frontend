/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  MdDriveFolderUpload,
  MdInbox,
  MdKeyboardDoubleArrowLeft,
  MdLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { CiGrid32, CiHome } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "../UI/Button/Button";
import { handleLogout } from "../../redux/services/authServices";
import avatar from "../../assets/images/Avatar.jpg";
import { t } from "i18next";

const Sidebar = () => {
  const [Open, setOpen] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const [notifications, setNotifications] = useState({
    Home: 2,
    Projects: 2,
    Inbox: 0,
    Drive: 0,
    Plan: 1,
    Team: 0,
    Settings: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(handleLogout());
    navigate("/LogIn/Mail");
  };

  const items = [
    {
      title: t("Home"),
      icon: <CiHome className="sidebar_icon" />,
      path: "/",
      notificationCount: notifications.Home,
    },
    {
      title: t("Projects"),
      icon: <CiGrid32 className="sidebar_icon" />,
      path: "/Projects",
      notificationCount: notifications.Projects,
    },
    {
      title: t("Inbox"),
      icon: <MdInbox className="sidebar_icon" />,
      path: "/Inbox",
      notificationCount: notifications.Inbox,
    },
    {
      title: t("Drive"),
      icon: <MdDriveFolderUpload className="sidebar_icon" />,
      path: "/DriveFiles",
      notificationCount: notifications.Drive,
    },
    {
      title: t("SeePlan"),
      icon: <MdOutlinePayment className="sidebar_icon" />,
      path: "/SeePlans",
      notificationCount: notifications.Plan,
    },
    {
      title: t("Team"),
      icon: <RiTeamFill className="sidebar_icon" />,
      path: "/Team",
      notificationCount: notifications.Team,
    },
    {
      title: t("settings"),
      icon: <GiSettingsKnobs className="sidebar_icon" />,
      path: "/Settings",
      notificationCount: notifications.Settings,
    },
  ];

  const handleProfileClick = () => {
    setIsProfileActive(!isProfileActive);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  const nameParts = user.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <div className="Sidebar rtl:left-0">
      <div
        className={`bg-white h-full py-5 pt-8 relative transition-custom duration-500 hidden lg:flex flex-col ${
          !Open ? "w-72" : "w-24"
        }`}
      >
        <MdKeyboardDoubleArrowLeft
          onClick={() => setOpen(!Open)}
          className={`bg-white rounded-full text-purple border border-purple p-1 text-3xl absolute ltr:-right-4 rtl:-left-3 top-20 cursor-pointer ${
            !Open && "rotate-180"
          }`}
        />
        <div
          className={`flex gap-2 items-center profile py-6 px-5 ${
            isProfileActive && "item_sidebar"
          }`}
        >
          <Link
            to="/Settings"
            state={{ tabIndex: 1 }}
            onClick={handleProfileClick}
            className="flex gap-2 items-center"
          >
            <div className="relative">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="avatar"
                  className="rounded-full  w-24 h-24 object-contain relative border border-solid  border-gray p-2"
                />
              ) : (
                <>
                  <span className="user-profile-image h-12 w-12 text-xl ">
                    {firstNameInitial}
                    {lastNameInitial}
                  </span>
                </>
              )}
              <span className="bg-green absolute rounded-full w-4 h-4 left-8 top-8"></span>
            </div>
            {!Open && (
              <div className="flex flex-col">
                <p className="name font-bold font-inter text-xs">{user.name}</p>
                {user.role || user.role !== null && (
                <p className="role font-bold font-inter text-xs text-gray">
                  {user?.role?.jobTitle}
                </p>
                )}
              </div>
            )}
          </Link>
        </div>
        <div
          className={`items w-full flex flex-col mt-5 gap-3 overflow-hidden`}
        >
          {items.map((item, index) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => handleItemClick(index)}
              className={`text-sm font-semibold font-inter text-gray transition-custom duration-custom flex items-center gap-3 py-5 px-5 ${
                index === activeIndex ? "item_sidebar" : ""
              }
              ${item.path === window.location.pathname ? "item_sidebar" : ""}
                 ${Open && "item_sidebar_close pl-7"}`}
            >
              <span
                className={`${index === activeIndex ? "icon" : ""}    ${
                  item.path === window.location.pathname ? "icon" : ""
                }`}
              >
                {item.icon}
              </span>
              <p className={`${Open && "scale-0"}`}> {item.title}</p>
              {!Open && item.notificationCount > 0 && (
                <span className="Notifications rounded-full ltr:right-4 rtl:left-4 absolute w-8 h-8 bg-red-500 !text-red flex items-center justify-center">
                  {item.notificationCount}
                </span>
              )}
            </Link>
          ))}
          {/* Logout Button */}
          {user ? (
            <button
              onClick={handleLogoutClick}
              className={`text-sm font-semibold font-inter text-gray transition-custom duration-custom flex items-center gap-3 py-5 px-5   ${
                Open && "item_sidebar_close pl-7"
              }`}
            >
              <span>
                {" "}
                <MdLogout className="w-6 h-6" />
              </span>
              {!Open && <span>{t("logout")}</span>}
            </button>
          ) : (
            <Button className="mt-auto w-full">
              <Link to="/SignUp/ChooseRole">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
