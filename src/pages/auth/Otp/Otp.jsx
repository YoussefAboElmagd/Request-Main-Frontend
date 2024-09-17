import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import OtpImg from "../../../assets/images/Otp.png";
import Button from "../../../Components/UI/Button/Button";
import OTPInput from "react-otp-input";
import Loader from "../../../Components/Loader/Loader";
import { t } from "i18next";
import "./style.scss";
import { signInThunk } from "../../../redux/services/authServices";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../Services/api";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, forget, userData, token, password, email } =
    location.state || {};

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
      if (forget) {
        if (otp === forget.verificationCode) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);
          const forget_id = forget.id;
          navigate("/forgotPassword", { state: { forget_id } });
        } else {
          setError(t("OTP is incorrect"));
        }
      } else if (phone) {
        if (otp === userData.verificationCode) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          setError(t("OTP is incorrect"));
        }
      } else if (userData) {
        console.log(userData);

        if (otp === userData.verificationCode) {
          // Save user data and token to localStorage
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          setError(t("OTP is incorrect"));
        }
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
  setLoading(true);

  try {
    let result;

    if (userData) {
      result = await dispatch(signInThunk({ email, password })).unwrap();
      userData.verificationCode = result.userData.verificationCode;
    } else if (email) {
      result = await dispatch(forgetPassword({ email })).unwrap();
      forget.verificationCode = result.verificationCode;
    }

    console.log("Resent OTP successfully", result);
  } catch (error) {
    console.error("Error resending OTP:", error);
    setError(t("Error resending OTP. Please try again."));
  } finally {
    setLoading(false);
  }
};


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
                width={590}
                height={516}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col items-center">
              <div className="Otp_text font-workSans font-normal text-xl text-center">
                <p>
                  {t(
                    `An OTP message containing your code has been sent to ${
                      userData ? userData.email : phone
                    }`
                  )}
                </p>
              </div>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                shouldAutoFocus
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
