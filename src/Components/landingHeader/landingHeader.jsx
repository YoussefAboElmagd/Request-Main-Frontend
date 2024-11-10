import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";
import { FaBarsStaggered } from "react-icons/fa6";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { CheckInput } from "../../pages/setting/setting";

const LandingHeader = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const  location  = useLocation();

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

  const toggleLangOptions = () => {
    setIsLangOpen(!isLangOpen);
  };
  useEffect(() => {
    const lang = i18n.language || "en";
    setIsRTL(lang === "ar");
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    window.location.reload();
  };
  return (
    <div
      className={`header ${
        location.pathname === "/landing/services" ||
        location.pathname === "/landing/ContactUs"
          ? "header_effect"
          : ""
      }`}
    >
      <header className="flex justify-between align-center p-3">
        <div className="logo hidden lg:block font-bold text-2xl">logo</div>
        {/* mobile view items */}
        <div className="block lg:hidden">
          <button onClick={openDrawer}>
            <FaBarsStaggered className="text-purple w-5 h-5" />
          </button>
          <Drawer open={open} onClose={closeDrawer} className="p-4">
            <div className="mb-6 flex items-center ">
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <IoMdClose />
              </IconButton>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to={"/landing"}
                className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
              >
                {t("Home")}
              </Link>
              <Link
                to={"/landing/services"}
                className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
              >
                {t("Services")}
              </Link>
              <Link
                to={"/landing/seePlans"}
                className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
              >
                {t("Price")}
              </Link>
              <Link
                to={"/landing/ContactUs"}
                className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
              >
                {t("Contact us")}
              </Link>
              <Link
                className="flex items-center justify-between select-none gap-1 font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
                // onClick={toggleLangOptions}
              >
                <span> {t("language")}</span>
                <CheckInput
                  // checked={languageChecked}
                  // onChange={() => {
                  //   setLanguageChecked(!languageChecked);
                  // }}
                />
              </Link>
            </div>
          </Drawer>
        </div>
        <div className="items relative">
          <nav className=" hidden lg:flex items-center gap-5 ">
            <Link
              to={"/landing"}
              className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
            >
              {t("Home")}
            </Link>
            <Link
              to={"/landing/services"}
              className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
            >
              {t("Services")}
            </Link>
            <Link
              to={"/landing/seePlans"}
              className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
            >
              {t("Price")}
            </Link>
            <Link
              to={"/landing/ContactUs"}
              className="font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
            >
              {t("Contact us")}
            </Link>
            <Link
              className="flex items-center select-none gap-1 font-medium text-lg hover:text-purple focus:text-purple cursor-pointer"
              onClick={toggleLangOptions}
            >
              <span> {t("language")}</span>
              <span>
                <IoIosArrowDown style={{ color: "var(--gray-md)" }} />
              </span>
            </Link>
          </nav>
          <div
            className={`lang_options z-50 bg-white shadow-lg rounded-md p-2 absolute ltr:right-3 rtl:-left-2 w-24 mt-3 transition-all duration-300 ${
              isLangOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            }`}
          >
            <div
              onClick={() => changeLanguage("ar")}
              className="ar font-workSans font-medium text-base text-gray-md m-1 cursor-pointer text-center"
            >
              العربية
            </div>
            <div
              onClick={() => changeLanguage("en")}
              className="en font-workSans font-medium text-base text-gray-md m-1 cursor-pointer text-center"
            >
              English
            </div>
          </div>
        </div>
        <div className="CTA">
          <Link to="/LogIn/Mail">
            <button className="py-1 px-5 md:px-10 bg-linear_1 rounded-3xl text-light mx-2 font-semibold md:text-xl text-base">
              {t("signIn")}
            </button>
          </Link>
          <Link to="/SignUp/ChooseRole">
            <button className="py-1 px-5 md:px-10 bg-light border border-purple border-solid rounded-3xl text-purple mx-2 font-semibold md:text-xl text-base ">
              {t("Sign Up")}
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default LandingHeader;
