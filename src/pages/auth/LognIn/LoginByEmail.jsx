import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import image from "../../../assets/images/LogInByPhone.png";
import "./style.scss";
import Button from "../../../Components/UI/Button/Button";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../Components/UI/Input/Input";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Google from "../../../assets/images/Google.png";
import Apple from "../../../assets/images/Apple.png";
import Facebook from "../../../assets/images/Facebook.png";
import { signInThunk } from "../../../redux/services/authServices";

const LoginByMail = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  console.log("Error object:", error);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await dispatch(signInThunk({ email, password })).unwrap();
      console.log("result :::: =>  ", result);

      const userData = result.userData;
      const token = result.token;

      navigate("/Otp", {
        state: {
          userData_login: userData,
          token,
          password_logIn : password,
          email_logIn: email,
        },
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LogIn h-screen relative effect overflow-hidden ">
      {loading || isLoading ? (
        <div className="loader flex justify-center items-center  m-auto">
          <Loader />
        </div>
      ) : (
        <>
          <AuthHeader />
          <div className="Wrapper flex items-center justify-between ">
            <div className="w-96 my-40">
              <h3 className="font-workSans font-bold text-5xl">
                {t("sign in To activate your business easily")}
              </h3>
              <p className="font-jost font-medium text-2xl">
                {t("if you don’t have an account you can")}
                <Link to="/sign-up" className="text-blue block">
                  {t("Register here!")}
                </Link>
              </p>
            </div>
            <div className="LogIn_Image flex justify-center ">
              <img
                src={image}
                alt="LogIn By Phone"
                width={400}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col mt-14 ">
              <form onSubmit={handleSubmit}>
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
                <Link
                  to={"/forgotPassword"}
                  className="forgot_Password text-purple   underline underline-offset-1 font-normal  text-sm"
                >
                  {t("Forgot Password?")}
                </Link>

                <Button
                  className="mt-5 w-full flex justify-center  items-center"
                  type="submit"
                >
                  {t("signIn")}
                </Button>
                {error && (
                  <div className="text-center">
                    <p className="text-red">{error}</p>
                  </div>
                )}
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
                <div className="box_Facebook">
                  <img src={Facebook} alt="Facebook" width={23} height={28} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginByMail;
