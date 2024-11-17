import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { approveInvite, getDataForInvite } from "../../../Services/api";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";

const Invitation = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const invitationId = queryParams.get("id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      navigate("/SignUp/ChooseRole");
      return;
    }
    if (!invitationId) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = user._id;
        const data = await getDataForInvite(token, invitationId, userId);
        setData(data.results);
        if (!data.results.isSignUp) {
          navigate("/SignUp/ChooseRole");
          return;
        }
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, invitationId, token, navigate]);

  const handleApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await approveInvite(token, invitationId);
      console.log(res);
      toast.success(`you have been added  to ${data.projectName} successfully`);
      navigate("/");
    } catch (error) {
      console.error("Error approving invitation:", error);
      setError(error.message);
    }
  };

  return (
    <div className="Invitation flex justify-center  items-center text-center  effect h-screen overflow-hidden">
      {loading ? (
        <div className="loader flex justify-center items-center m-auto">
          <Loader />
        </div>
      ) : (
        <div className="wrapper flex flex-col gap-4 ">
          <h3 className="font-inter font-bold text-2xl md:text-3xl lg:text-5xl leading-[50px]  text-purple-dark text-center">
            Welcome <span>{data?.name}</span> to Request !
          </h3>
          <p className="font-inter font-medium text-base md:text-lg lg:text-xl leading-8 ] text-center lg:mt-4 text-gray-600">
            You have been invited to
            <span className="font-bold"> {data?.projectName}</span> <br /> as a
            <span className="font-bold"> {data?.role?.jobTitle}</span>
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-14">
            <button
              className={`p-6 lg:p-10  w-[280px] lg:w-[354px] rounded-3xl bg-linear_1   text-white font-bold text-3xl `}
              onClick={handleApprove}
            >
              {t("Approve")}
            </button>
            <button
              className={`p-6 lg:p-10 w-[280px] lg:w-[354px] border border-red border-solid text-red rounded-3xl font-bold text-3xl `}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invitation;
