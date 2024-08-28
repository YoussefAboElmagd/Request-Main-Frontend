import { MdNotificationsNone } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { IoSearch } from "react-icons/io5";
import "./style.scss";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNonfiction = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="Header bg-white border border-light">
      <header className="flex justify-between align-center p-3">
        <div className="logo flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            width={31}
            height={31}
            className="rounded-md "
          />
          <span className="font-inter font-bold text-sm ">Request</span>
        </div>
        <div className="search relative">
          <input
            type="text"
            placeholder={"Search"}
            className="search w-full text-sm text-gray border rounded-md  border-gray"
          />
          <span className="absolute top-3 left-10 flex items-center gap-2 text-gray ">
            <IoSearch className=" w-[17px] h-[17px]" />
          </span>
        </div>
        <div className="notifications">
          <button onClick={toggleNonfiction}>
            <MdNotificationsNone className=" w-[34px] h-[34px] text-gray relative" />
            <span className="bg-red w-[10px] h-[10px]  absolute rounded-full  top-4 right-4 "></span>
          </button>
          <div
            className={`notification-dropdown ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            } absolute right-3 top-12 border border-gray bg-white shadow-lg rounded-md p-2 mt-3 transition-all duration-300`}
          >
            <div className="  text-gray px-2 py-1">
              <span>Notifications</span>
            </div>
            <div className="  text-gray px-2 py-1">
              <span>Notifications</span>
            </div>
            <div className="  text-gray px-2 py-1">
              <span>Notifications</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
