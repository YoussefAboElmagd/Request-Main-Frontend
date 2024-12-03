import { MdNotificationsNone } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { IoSearch } from "react-icons/io5";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationItem from "../NotificationItem/NotificationItem";
import { IoIosWarning } from "react-icons/io";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { PiHeadset } from "react-icons/pi";
import { NotificationsContext } from "../../context/NotificationsContext";
import { getAllNotifications } from "../../Services/api";
const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const { t, i18n } = useTranslation();
  const { notifications, addNotification } = useContext(NotificationsContext);
  const toggleNonfiction = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const lang = i18n.language || "en";
    setIsRTL(lang === "ar");
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

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
            placeholder={t("search")}
            className="search w-full text-sm text-gray border rounded-md  border-gray "
          />
          <span className="absolute top-3 ltr:left-10 rtl:right-16 flex items-center gap-2 text-gray ">
            <IoSearch className=" w-[17px] h-[17px]" />
          </span>
        </div>
        <div className="flex justify-between items-center">
          {/* {user.notifications && ( */}
          <div className="notifications">
            <button onClick={toggleNonfiction}>
              <MdNotificationsNone className=" w-[34px] h-[34px] text-gray relative" />
              {notifications.length !== 0 && (
                <span className="bg-red w-[10px] h-[10px]  absolute rounded-full  top-4 ltr:right-4 rtl:left-4 "></span>
              )}
            </button>
            <div
              className={`notification-dropdown ${
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              } absolute ltr:right-3 top-12 rtl:left-3 w-[600px] h-[300px] overflow-y-scroll  border border-gray bg-white shadow-lg rounded-md  mt-3 transition-all duration-300 z-50`}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="flex justify-between items-center m-2">
                <span className="text-purple-dark text-base font-bold">
                  {t("New for you")}
                </span>
                {notifications.length !== 0 && (
                  <button
                    className="text-gray underline underline-offset-1 text-sm font-normal m-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("Make All Read")}
                  </button>
                )}
              </div>

              {notifications.length === 0 && (
                <div className="text-gray text-center mt-4">
                  {t("no notifications available")}
                </div>
              )}
              {notifications
                .filter((notification) => notification?.message)
                .slice(-5)
                .map((notification, idx) => (
                  <NotificationItem
                    key={notification._id}
                    type={notification?.type}
                    message_en={notification?.message?.message_en}
                    message_ar={notification?.message?.message_ar}
                    timestamp={
                      notification?.timestamp || new Date().toLocaleString()
                    }
                    showButtons={notification?.showButtons}
                  />
                ))}
              {notifications.length !== 0 && (
                <div className="footer sticky bottom-0 bg-linear_1 w-full !m-0 p-2 rounded-t-2xl">
                  <Link
                    to="/Notifications"
                    className="text-white font-medium text-base "
                  >
                    Previous notifications
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* )}  */}
        </div>
      </header>
    </div>
  );
};

export default Header;
