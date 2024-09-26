import { MdNotificationsNone } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { IoSearch } from "react-icons/io5";
import "./style.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import lang from "../../assets/images/lang.png";
import { IoIosArrowDown } from "react-icons/io";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleNonfiction = () => {
    setIsOpen(!isOpen);
  };
  // const toggleLangOptions = () => {
  //   setIsLangOpen(!isLangOpen);
  // };

  useEffect(() => {
    const lang = i18n.language || "en";
    setIsRTL(lang === "ar");
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  //   window.location.reload();
  // };
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
          {/* <div className="lang relative">
            <div
              className="lang_wrapper mx-2 flex gap-1 items-center cursor-pointer"
              onClick={toggleLangOptions}
            >
              <img src={lang} alt="lang" width={30} height={30} />
              <IoIosArrowDown style={{ color: "var(--gray-md)" }} />
            </div>
            <div
              className={`lang_options bg-white shadow-lg rounded-md p-2 absolute w-24 mt-3 transition-all duration-300 ${
                isLangOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div
                onClick={() => changeLanguage("ar")}
                className="ar font-workSans font-medium text-base text-gray-md m-1 cursor-pointer text-center"
              >
                العربيه
              </div>
              <div
                onClick={() => changeLanguage("en")}
                className="en font-workSans font-medium text-base text-gray-md m-1 cursor-pointer text-center"
              >
                English
              </div>
            </div>
          </div> */}
          <div className="notifications">
            <button onClick={toggleNonfiction}>
              <MdNotificationsNone className=" w-[34px] h-[34px] text-gray relative" />
              <span className="bg-red w-[10px] h-[10px]  absolute rounded-full  top-4 ltr:right-4 rtl:left-4 "></span>
            </button>
            <div
              className={`notification-dropdown ${
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              } absolute ltr:right-3 top-12 rtl:left-3 border border-gray bg-white shadow-lg rounded-md p-2 mt-3 transition-all duration-300`}
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
        </div>
      </header>
    </div>
  );
};

export default Header;
