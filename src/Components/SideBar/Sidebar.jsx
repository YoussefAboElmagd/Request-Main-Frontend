import { useState } from "react";
import { MdDriveFolderUpload, MdInbox, MdKeyboardDoubleArrowLeft, MdOutlinePayment } from "react-icons/md";
// import logo from "../../assets/images/Apple.png"
import avatar  from "../../assets/images/avatar.png"

import { CiGrid32, CiHome } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./style.scss"
const Sidebar = () => {
  const [Open, setOpen] = useState(true);

  const items = [
    {
      title: "Home",
      icon: <CiHome className="sidebar_icon" />,
      path: "/",
    },
    {
      title: "Projects",
      icon: <CiGrid32 className="sidebar_icon" />,
      path: "/Projects",
    },
    {
      title: "Inbox",
      icon: <MdInbox className="sidebar_icon" />,
      path: "/Inbox",
    },
    {
      title: "Drive Files",
      icon: <MdDriveFolderUpload className="sidebar_icon" />,
      path: "/Drive",
    },
    {
      title: "see plan",
      icon: <MdOutlinePayment className="sidebar_icon" />,
      path: "/plan",
    },
    {
      title: "Settings",
      icon: <GiSettingsKnobs className="sidebar_icon" />,
      path: "/Settings",
    },
  ];
  return (
    <div className="Sidebar ">
      <div
        className={`bg-white h-screen   py-5 pt-8 relative transition-custom duration-500  flex flex-col ${
          !Open ? " w-72" : " w-20"
        }`}
      >
        <MdKeyboardDoubleArrowLeft
          onClick={() => setOpen(!Open)}
          className={`bg-white rounded-full  text-purple  border border-purple p-1 text-3xl absolute -right-4 top-20 cursor-pointer ${
            !Open && "rotate-180"
          }`}
        />
        {/* <div className="inline-flex items-center  gap-2 logo py-6">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 rounded-xl object-contain"
          />
          <h1
            className={`text-black font-bold font-inter text-xs ${
              Open && "scale-0"
            } transition-custom duration-500`}
          >
            Request
          </h1>
        </div> */}
        <div className="inline-flex gap-2 items-center  profile py-6  px-5 ">
          <div className="avatar border border-gray rounded-full relative">
            <img
              src={avatar}
              alt="avatar"
              className={`w-12 h-12 rounded-full object-contain ${
                Open && "opacity-100"
              }`}
            />
            <span className="bg-green absolute  rounded-full w-4 h-4 left-8 top-8"></span>
          </div>
          <div className={`flex flex-col ${Open && "scale-0"} `}>
            <p className="name font-bold font-inter text-xs">name</p>
            <p className="role  font-bold font-inter text-xs text-gray">
              consultant
            </p>
          </div>
        </div>
        <div className="items w-full flex flex-col mt-5 gap-3">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={` text-sm font-semibold font-inter text-gray transition-custom duration-custom  flex items-center gap-3 py-5 px-4 ${
                item.path === window.location.pathname ? "item_sidebar" : ""
              } ${Open && "item_sidebar_close "}`}
            >
              <span
                className={`${
                  item.path === window.location.pathname ? "icon" : ""
                }`}
              >
                {item.icon}
              </span>
              <p className={`${Open && "scale-0"}`}> {item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
