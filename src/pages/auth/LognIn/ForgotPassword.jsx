import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import Loader from "../../../Components/Loader/Loader";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import { t } from "i18next";
import forgot from "../../../assets/images/forgot.png";
import { forgetPassword, updateUser } from "../../../Services/api";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import LandingHeader from "../../../Components/landingHeader/landingHeader";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { forget_id } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (forget_id) {
        console.log("userId:", forget_id, "password:", password);
        const result = await updateUser(forget_id, {
           password,
        });
        console.log(result);
        navigate("/LogIn/Mail");
      } else {
        const forget = await forgetPassword(email);
        console.log(forget);
        navigate("/Otp", { state: { forget_email: email, forget } });
      }
    } catch (err) {
      console.error("Error processing request:", err);
      setError(t("Failed to process your request. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ForgotPassword h-screen relative effect overflow-hidden">
      {loading ? (
        <div className="loader flex justify-center items-center m-auto">
          <Loader />
        </div>
      ) : (
        <>
          <LandingHeader />
          <div className="Wrapper flex items-center justify-between">
            <div className="w-96 my-40">
              {forget_id ? (
                <>
                  <h3 className="font-workSans font-bold text-5xl">
                    {t("Reset Your Password")}
                  </h3>
                  <p className="font-jost font-medium text-2xl">
                    {t("Enter your new password below to complete the reset")}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-workSans font-bold text-5xl">
                    {t("Enter your email to reset the password")}
                  </h3>
                  <p className="font-jost font-medium text-2xl">
                    {t(
                      "You will receive a code in your email that must be entered to reset your password"
                    )}
                  </p>
                </>
              )}
            </div>
            <div className="LogIn_Image flex justify-center">
              <img
                src={forgot}
                alt="Forgot Password"
                width={600}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col mt-14">
              <form onSubmit={handleSubmit}>
                {forget_id ? (
                  <div className="password">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("Enter New Password")}
                      id="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={8}
                      inputIcons={[
                        {
                          element: (
                            <FaRegEyeSlash
                              className="text-gold cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ),
                          type: "visibility",
                        },
                        {
                          element: (
                            <FaEye
                              className="text-gold cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ),
                          type: "visibility",
                        },
                      ]}
                    />
                  </div>
                ) : (
                  <div className="email">
                    <Input
                      placeholder={t("enter email")}
                      type="email"
                      id="email"
                      autoComplete="email"
                      autoFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                <Button
                  className="mt-5 w-full flex justify-center items-center"
                  type="submit"
                  disabled={loading}
                >
                  {t("Send")}
                </Button>
                {error && (
                  <div className="text-center">
                    <p className="text-red">{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
