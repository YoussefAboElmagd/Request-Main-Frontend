import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../Components/UI/Button/Button";
import SignUpImg from "../../../assets/images/SignUp.png";
import Input from "../../../Components/UI/Input/Input";
import { FaEye, FaPhoneAlt, FaRegEyeSlash } from "react-icons/fa";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import Google from "../../../assets/images/Google.png";
import Apple from "../../../assets/images/Apple.png";
import Facebook from "../../../assets/images/Facebook.png";
import "./style.scss";
import i18next, { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  startAuth,
  authSuccess,
  authFailure,
} from "../../../redux/slices/authSlice";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import countries from "react-select-country-list";
import { TbUserEdit } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { handleSignUp } from "../../../redux/services/authServices";
import { toast } from "react-toastify";
import LandingHeader from "../../../Components/landingHeader/landingHeader";
const SignUp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { roleId } = location.state || {};
  ("role id from state =>", roleId);

  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [country, setCountry] = useState({
    value: "SA",
    label: "Saudi Arabia",
  });
    const lang = i18next.language;
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      trimmedEmail === "" ||
      trimmedPassword === "" ||
      trimmedName === "" ||
      trimmedPhone === ""
    ) {
      toast.error(t("field cannot be empty, Please fill in all fields."));
      return;
    }

    // Check for empty fields
    if (
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedName ||
      !trimmedPhone ||
      !trimmedConfirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const userData = {
      email: trimmedEmail,
      password: trimmedPassword,
      name: trimmedName,
      phone: trimmedPhone,
      role: roleId,
    };
    ("userData :::: =>  ", userData);
    try {
      const result = await dispatch(handleSignUp(userData)).unwrap();
      ("result -----> ", result);
      (result.results);
      (result.token);

      const userData_signUp = result.results;
      const token_signUp = result.token;

      // Navigate to OTP page with user data
      navigate("/Otp", {
        state: {
          email_signUp: trimmedEmail,
          userData_signUp,
          token_signUp,
        },
      });
    } catch (err) {
      console.error("Sign Up failed:", err);
    }
  };

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
      background: state.isSelected ? "var(--linear1)" : "#EAF0F7",
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        background: state.isSelected ? "var(--linear1)" : "#f0f0f0",
      },
    }),
  };

  return (
    <div className="LogIn h-full relative effect overflow-hidden">
      {isLoading ? (
        <div className="loader flex items-center justify-center m-auto">
          <Loader />
        </div>
      ) : (
        <>
          <LandingHeader />
          <div className="Wrapper flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full  md:w-1/2 lg:w-2/5 flex  flex-col items-center  mt-14  md:my-40">
              <div className="image_phone md:hidden">
                <img
                  src={SignUpImg}
                  alt="LogIn By Phone"
                  width={300}
                  height={300}
                  loading="lazy"
                />
              </div>
              <h3 className="font-workSans font-semibold text-purple text-center md:text-left md:text-gray-dark md:font-bold text-xl md:text-3xl lg:text-5xl">
                {t("sign up To activate your business easily")}
              </h3>
              <p className="font-jost font-medium hidden md:block md:text-xl lg:text-2xl">
                {t("if you don't have an account you can")}
                <Link className="text-blue block" to={"/LogIn/Mail"}>{t("sign in here!")}</Link>
              </p>
            </div>
            <div className="LogIn_Image md:flex justify-center hidden -z-10">
              <img
                src={SignUpImg}
                alt="SignUpImg"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col mt-14">
              <form onSubmit={handleSubmit}>
                <div className="name">
                  <Input
                    placeholder={t("yourName")}
                    type="text"
                    id="name"
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    label={t("yourName")}
                    labelIcon={<TbUserEdit />}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="email">
                  <Input
                    placeholder="name@email.com"
                    type="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    labelIcon={<CiMail />}
                    label={t("enter email")}
                  />
                </div>
                <div className="phone relative">
                  <label className="Input_label flex items-center gap-2 font-jost text-base font-medium">
                    <span className="label_icon w-4 h-4">
                      <FiPhone />
                    </span>
                    {t("PhoneNumber")}
                  </label>
                  <div className="input flex items-center my-2">
                    <PhoneInput
                      international
                      defaultCountry={country.value}
                      country={country.value}
                      onChange={(value) => setPhone(value)}
                      value={phone}
                      maxlength={11}
                      placeholder={"+96244679900"}
                      className="Input text-black font-jost font-normal text-base py-2 !relative px-4 w-full"
                    />
                    <Select
                      options={countryOptions}
                      value={country}
                      onChange={(option) => setCountry(option)}
                      className=""
                      styles={customStyles}
                      classNamePrefix="select"
                    />
                  </div>
                </div>
                <div className="password">
                  <Input
                    type="password"
                    placeholder={"••••••••"}
                    className="placeholder:font-normal placeholder:text-xl placeholder:font-inter"
                    id="password"
                    autoComplete="password"
                    required
                    value={password}
                    label={t("Enter password")}
                    labelIcon={<MdLockOutline />}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    inputIcons={[
                      {
                        element: <FaRegEyeSlash className="text-gold" />,
                        type: "visibility",
                      },
                      {
                        element: <FaEye />,
                        type: "visibility",
                      },
                    ]}
                  />
                </div>
                <div className="confirmPassword">
                  <label
                    htmlFor="confirmPassword"
                    className="font-inter confirmPassword_label font-normal text-xs absolute z-10 mx-2 bg-white p-1 rounded-3xl text-purple-dark"
                  >
                    {t("confirm password")}
                  </label>
                  <Input
                    placeholder={"••••••••"}
                    type="password"
                    id="confirmPassword"
                    autoComplete="password"
                    className="confirmPassword_input border-purple-dark border focus:!border relative placeholder:font-normal placeholder:text-xl placeholder:font-inter"
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    minLength={8}
                    inputIcons={[
                      {
                        element: <FaRegEyeSlash className="text-gold" />,
                        type: "visibility",
                      },
                      {
                        element: <FaEye />,
                        type: "visibility",
                      },
                    ]}
                  />
                  {passwordError && (
                    <div className="error text-red text-xs mt-2 mx-auto text-center">
                      {passwordError}
                    </div>
                  )}
                </div>
                {error && (
                  <div className="error text-red mt-4 text-center">{error}</div>
                )}

                <Button
                  type="submit"
                  className="mt-5 w-full  flex justify-center  items-center"
                >
                  {t("Register")}
                </Button>
              </form>
              <div className="my-2 flex items-center justify-center relative">
                <span className="or">{t("or")}</span>
              </div>
              <div className="flex items-center justify-between mt-4 gap-4">
                <div className="box_Google">
                  <img src={Google} alt="Google" width={23} height={28} />
                </div>
                <div className="box_Apple">
                  <img src={Apple} alt="Apple" width={23} height={28} />
                </div>
                <Link to={"/LogIn"} className="box_phone">
                  <FaPhoneAlt className="text-purple" />
                </Link>
              </div>
              <p className="font-jost font-medium  text-lg text-center block md:hidden my-4">
                {t("if you do not have an account you can")}
                <Link to="/sign-up" className="text-blue block">
                  {t("Register here!")}
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
