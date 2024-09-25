import { useState, useEffect, version } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import OtpImg from "../../../assets/images/Otp.png";
import Button from "../../../Components/UI/Button/Button";
import OTPInput from "react-otp-input";
import Loader from "../../../Components/Loader/Loader";
import { t } from "i18next";
import "./style.scss";
import {
  handleSignUp,
  signInThunk,
} from "../../../redux/services/authServices";
import { useDispatch } from "react-redux";
import { forgetPassword, resendVerificationCode } from "../../../Services/api";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    phone,
    forget_email,
    forget,
    token,
    userData_signUp,
    email_logIn,
    userData_login,
    email_signUp,
  } = location.state || {};

  const dispatch = useDispatch();

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      switch (true) {
        case !!forget_email:
          if (otp === forget.verificationCode) {
            console.log(
              "otp ===  forget.verificationCode",
              otp,
              forget.verificationCode
            );
            navigate("/forgotPassword", { state: { forget_id: forget.id } });
          } else {
            setError(t("OTP is incorrect"));
          }
          break;

        case !!phone:
          if (otp === userData.verificationCode) {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            navigate("/");
          } else {
            setError(t("OTP is incorrect"));
          }
          break;

        case !!userData_login:
          console.log("userData_login", userData_login);

          if (otp === userData_login.verificationCode) {
            console.log(
              "otp === userData_login.verificationCode",
              otp,
              userData_login.verificationCode
            );
            localStorage.setItem("user", JSON.stringify(userData_login));
            localStorage.setItem("token", token);
            navigate("/");
          } else {
            setError(t("OTP is incorrect"));
          }
          break;

        case !!userData_signUp:
          if (otp === userData_signUp.verificationCode) {
            console.log(otp);
            console.log(userData_signUp);
            console.log(userData_signUp.verificationCode);
            localStorage.setItem("user", JSON.stringify(userData_signUp));
            localStorage.setItem("token", token);
            navigate("/SignUp/createCompany");
          } else {
            setError(t("OTP is incorrect"));
          }
          break;

        default:
          setError(t("Invalid OTP request"));
          break;
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError(t("Error verifying OTP. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setCanResend(false);
    setTimeLeft(60);
    setError("");

    try {
      let result;

      // Handle resend OTP for different scenarios
      if (forget_email) {
        result = await forgetPassword(forget_email);
        console.log(result);
        console.log(result.verificationCode);

        forget.verificationCode = result.verificationCode;
      } else if (email_logIn) {
        result = await resendVerificationCode(email_logIn);
        userData_login.verificationCode = result.verificationCode;
        console.log(
          "Updated verification code after login resend:",
          userData_login.verificationCode
        );
      } else if (email_signUp) {
        result = await resendVerificationCode(email_signUp);
        userData_signUp.verificationCode = result.verificationCode;
        console.log(
          "Updated verification code after login resend:",
          userData_signUp.verificationCode
        );
      } else {
        throw new Error("Unable to resend OTP. Invalid request.");
      }

      console.log("Resent OTP successfully", result);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError(t("Error resending OTP. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); 

  return (
    <div className="Otp h-screen relative effect overflow-hidden">
      {loading ? (
        <div className="loader flex justify-center items-center m-auto">
          <Loader />
        </div>
      ) : (
        <>
          <AuthHeader />
          <div className="Wrapper flex items-center justify-between">
            <div className="w-96 my-40">
              <h3 className="font-workSans font-bold text-5xl">
                {t("Sign in to activate your business easily")}
              </h3>
              <p className="font-jost font-medium text-2xl">
                {t("If you don’t have an account you can")}
                <Link className="text-blue block" to="/register">
                  {t("Register here!")}
                </Link>
              </p>
            </div>
            <div className="LogIn_Image flex justify-center -z-10">
              <img
                src={OtpImg}
                alt="OTP"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col items-center">
              <div className="Otp_text font-workSans font-normal text-xl text-center">
                <p>
                  {t(`An OTP message containing your code has been sent to `)}
                </p>
                <span className="text-red d-block">
                  {phone
                    ? `+${phone.substring(0, 2)} ${phone.substring(
                        2,
                        5
                      )} ${phone.substring(5)}`
                    : forget_email
                    ? forget_email
                    : email_logIn
                    ? email_logIn
                    : email_signUp
                    ? email_signUp
                    : ""}
                </span>
              </div>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                shouldAutoFocus={true}
                required
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "48px",
                  height: "62px",
                  fontSize: "36px",
                  fontWeight: "bold",
                  textAlign: "center",
                  lineHeight: "46px",
                  border: "1px solid var(--purple)",
                  borderRadius: "8px",
                  padding: "0 10px",
                  margin: "30px 10px",
                }}
              />
              <p>
                {t("Code Sent. Resend Code in")}
                <span className="text-red">
                  {timeLeft > 0
                    ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`
                    : ""}
                </span>
              </p>

              <button
                disabled={!canResend}
                onClick={handleResendOtp}
                className={`mt-2 underline underline-offset-1 text-gray ${
                  canResend && "text-red"
                }`}
              >
                {t("Resend OTP")}
              </button>

              <Button className={"mt-5"} onClick={handleSubmit}>
                {t("Verify")}
              </Button>
              {error && (
                <div className="text-center text-red mt-4">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Otp;
