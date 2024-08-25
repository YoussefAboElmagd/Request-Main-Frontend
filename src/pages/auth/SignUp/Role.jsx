import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import Button from "../../../Components/UI/Button/Button";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { finishSignUp, startSignUp } from "../../../redux/slices/authSlice";
import { signUp } from "../../../Services/api";
import Loader from "../../../Components/Loader/Loader";

const Role = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { email, password, phone, name } = location.state || {};
  const { isLoadingSignUp } = useSelector((state) => state.auth);
  const handleRoleSelect = (role) => {
    if (selectedRole === role) {
      setSelectedRole("");
    } else {
      setSelectedRole(role);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startSignUp());

    try {
      const userData = { email, password, phone, name, role: selectedRole };
      console.log(userData);
      const res = await signUp(userData);
      console.log(res);
      dispatch(finishSignUp());
      navigate("/");
    } catch (err) {
      dispatch(finishSignUp());
      dispatch(setError(err.message || "Sign-up failed"));
    }
  };

  return (
    <div className="Role effect">
      {isLoadingSignUp ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <AuthHeader />
          <div className="Wrapper flex flex-col justify-center">
            <div className="flex items-start justify-center flex-col mt-16">
              <h3 className="font-inter font-bold text-5xl leading-[50px] max-w-[745px]">
                {t("What kind of customer are you?")}
              </h3>
              <p className="font-inter font-light text-xl leading-8 max-w-[600px]">
                {t(
                  "Select from the following options to be directed to the appropriate page"
                )}
              </p>
            </div>
            <div className="Buttons flex justify-center items-center gap-32 my-10">
              <button
                className={`RoleBtn owner ${
                  selectedRole === "owner" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("owner")}
                disabled={selectedRole && selectedRole !== "owner"}
              >
                {t("owner")}
              </button>
              <button
                className={`RoleBtn  consultant ${
                  selectedRole === "consultant" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("consultant")}
                disabled={selectedRole && selectedRole !== "consultant"}
              >
                {t("consultant")}
              </button>
              <button
                className={`RoleBtn contractor ${
                  selectedRole === "contractor" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("contractor")}
                disabled={selectedRole && selectedRole !== "contractor"}
              >
                {t("contractor")}
              </button>
            </div>
            {error && (
              <div className="text-center text-red">
                <p>{error}</p>
              </div>
            )}
            <div className="Next flex items-center justify-center mt-5">
              <Button onClick={handleSubmit}>{t("Next")}</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Role;
