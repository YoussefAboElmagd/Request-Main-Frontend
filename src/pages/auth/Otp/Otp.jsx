import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import OtpImg from "../../../assets/images/Otp.png";
import Button from "../../../Components/UI/Button/Button";
import OTPInput from "react-otp-input";
import { useState } from "react";
import "./style.scss";
import Loader from "../../../Components/Loader/Loader";
import { t } from "i18next";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="Otp h-screen  relative effect overflow-hidden ">
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <AuthHeader />
          <div className="Wrapper flex items-center justify-between ">
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
              <img
                src={OtpImg}
                alt="image"
                width={590}
                height={516}
                loading="lazy"
              />
            </div>
            <div className="form flex flex-col items-center">
              <div className="Otp_text font-workSans font-normal text-xl text-center ">
                <p>
                  {t("An OTP Message containing your code has been sent to")}
                </p>
                <span className="text-red font-workSans font-normal text-xl my-2">
                  {phone}
                </span>
              </div>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
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
                <span className="text-red"> 00:50</span>
              </p>
              <Button className={"mt-5"} onClick={handleSubmit}>
                {t("verify")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Otp;
