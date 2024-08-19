/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import image from "../../../assets/images/LogInByPhone.png";
import "./style.scss";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import saudi from "../../../assets/images/Flag.png";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
const LoginByPhone = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedPhone = value.startsWith("9665")
      ? `+${value}`
      : `+9665${value}`;

    if (formattedPhone.startsWith("+9665") && formattedPhone.length === 12) {
      setError("");
    } else {
      setError(
        `Phone number must start with +9665 and be followed by exactly 8 digits. Example: +966512345678`
      );
    }

    setPhone(formattedPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      navigate("/LogIn/Otp", { state: { phone } });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LogIn h-screen relative">
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
                sign in To activate your business easily
              </h3>
              <p className="font-jost  font-medium text-2xl">
                if you don’t have an account you can{" "}
                <Link className="text-blue">Register here!</Link>
              </p>
            </div>
            <div className=" LogIn_Image  flex justify-center -z-10">
              <img src={image} alt="image" width={400} loading="lazy" />
            </div>
            <div className="form flex flex-col">
              <Input
                type="tel"
                id="tel"
                pattern="\+9665[0-9]{8}"
                autoFocus={true}
                autoComplete="tel"
                placeholder="+966544679900"
                label={"Phone Number"}
                icons={[
                  {
                    element: <img src={saudi} alt="Saudi Flag" width={53} height={20} />,
                    type: "flag",
                  },
                ]}
                onChange={handlePhoneChange}
                required
              />
              {/* {error && 
          <p className="error text-red text-sm ">{error}</p>} */}
              <Button className={"mt-5"} onClick={handleSubmit}>
                sendOtp
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginByPhone;
