/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import image from "../../../assets/images/LogInByPhone.png";
import "./style.scss";
import Button from "../../../Components/UI/Button/Button";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { t } from "i18next";
import { FiPhone } from "react-icons/fi";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import countries from "react-select-country-list";
import { useDispatch, useSelector } from "react-redux";

const LoginByPhone = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {  phone,  error } =
      useSelector((state) => state.auth);
  const [country, setCountry] = useState({
    value: "SA",
    label: "Saudi Arabia",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     // setError("");
  //     // setLoading(true);
  //     navigate("/LogIn/Otp");
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const countryOptions = countries()
    .getData()
    .map((country) => ({
      value: country.value,
      label: `${country.label}`,
    }));
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "40%",
      borderRadius: "1.5rem",
      margin: "0.5rem 1rem",
      position: "absolute",
      zIndex: "99",
      right: "0",
      backgroundColor: "#EAF0F7",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      backgroundColor: "#EAF0F7",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      font: "jost",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-10px)",
      transition: "opacity 200ms ease, transform 200ms ease",
      ".react-select__menu-list": {
        opacity: 1,
        transform: "translateY(0)",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      borderRadius: "0.5rem",
      overflow: "auto",
      overflowX: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      borderRadius: state.isSelected ? ".25rem" : "0",
      background: state.isSelected ? "var(--linear1)" : "#EAF0F7   ",
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        background: state.isSelected ? "var(--linear1)" : "#f0f0f0",
      },
    }),
  };
  return (
    <div className="LogIn h-screen relative effect overflow-hidden ">
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <AuthHeader />
          <div className="Wrapper flex items-center justify-between">
            <div className="w-96 my-40 ">
              <h3 className="font-workSans  font-bold text-5xl">
                {t("sign in To activate your business easily")}
              </h3>
              <p className="font-jost  font-medium text-2xl">
                {t("if you don’t have an account you can")}
                <Link className="text-blue block">{t("Register here!")}</Link>
              </p>
            </div>
            <div className=" LogIn_Image  flex justify-center -z-10">
              <img src={image} alt="image" width={400} loading="lazy" />
            </div>
            <div className="form flex flex-col">
              <div className="phone relative">
                <label className="Input_label flex items-center  gap-2 font-jost text-base font-medium ">
                  <span className="label_icon w-4 h-4 ">
                    <FiPhone />
                  </span>
                  {t("PhoneNumber")}
                </label>
                <div className="input flex items-center my-2  ">
                  <PhoneInput
                    international
                    defaultCountry={country.value}
                    country={country.value}
                    onChange={(value) => {
                      dispatch( (value));
                    }}
                   
                    
                    placeholder={"+96244679900"}
                    className="Input font-jost font-normal text-base py-2 !relative px-4 w-full "
                  />
                  <Select
                    options={countryOptions}
                    value={country}
                    onChange={(option) => setCountry(option)}
                 
                    styles={customStyles}
                    classNamePrefix="select"
                  />
                </div>
              </div>
              {error && <p className="error text-red text-sm ">{error}</p>}
              <Button className={"mt-5"}>
                {t("sendOtp")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginByPhone;
