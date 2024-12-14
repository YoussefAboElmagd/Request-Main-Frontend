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
import {
  getAllNotifications,
  MakeAllRead,
  updateNotification,
} from "../../Services/api";
const Header = () => {
  const user = useSelector((state) => state.auth.user);    
  const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const { t, i18n } = useTranslation();
  const { notifications, addNotification, setNotifications } =
    useContext(NotificationsContext);
  const toggleNonfiction = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const lang = i18n.language || "en";
    setIsRTL(lang === "ar");
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const markAllAsRead = async () => {
    try {
      await MakeAllRead(token, user._id, { isRead: true });

      // Update the state to mark all notifications as read
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

const formatDate = (isoString) => {
  if (!isoString) {
    console.error("Invalid date input:", isoString);
    return "Invalid Date";
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    console.error("Invalid time value for:", isoString);
    return "Invalid Date";
  }

  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};


  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

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
              {unreadNotifications.length !== 0 && (
                <span className="bg-red w-[10px] h-[10px] absolute rounded-full top-4 ltr:right-4 rtl:left-4"></span>
              )}
            </button>
            <div
              className={`notification-dropdown ${
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              } absolute ltr:right-3 top-12 rtl:left-3 w-[600px] h-[300px] border border-gray bg-white shadow-lg rounded-md mt-3 transition-all duration-300 z-50 flex flex-col`}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="flex justify-between items-center m-2">
                <span className="text-purple-dark text-base font-bold">
                  {t("New for you")}
                </span>
                {unreadNotifications.length !== 0 && (
                  <button
                    className="text-gray underline underline-offset-1 text-sm font-normal m-2"
                    onClick={async () => {
                      await markAllAsRead();
                      setIsOpen(false);
                    }}
                  >
                    {t("Make All Read")}
                  </button>
                )}
              </div>

              <div className="relative flex-1 overflow-y-auto">
                {unreadNotifications.length === 0 && (
                  <div className="text-gray text-center mt-4">
                    {t("no new notifications")}
                  </div>
                )}
                {unreadNotifications
                  .filter((notification) => notification?.message)
                  .slice(0, 5)
                  .map((notification,idx ) => (
                    <NotificationItem
                      key={idx}
                      type={notification?.type}
                      message_en={notification?.message?.message_en}
                      message_ar={notification?.message?.message_ar}
                      timestamp={
                        notification?.createdAt ? 
                        formatDate(notification?.createdAt) :
                        new Date().toLocaleString()
                      }
                      isRead={notification?.isRead}
                      showButtons={notification?.showButtons}
                    />
                  ))}
              </div>

              <div className="footer bg-linear_1 p-2 text-start rounded-t-xl">
                <Link
                  to="/Notifications"
                  className="text-white font-medium text-base"
                >
                  {t("Previous notifications")}
                </Link>
              </div>
            </div>
          </div>
          {/* )}  */}
        </div>
      </header>
    </div>
  );
};

export default Header;
