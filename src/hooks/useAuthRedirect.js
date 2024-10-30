import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("User:", user); // Check if user exists
    console.log("Token:", token); // Check if token exists

    if (!user || !token) {
      console.log("Redirecting to /LogIn/Mail"); // Debugging log
      navigate("/LogIn/Mail");
    }
  }, [navigate]);
};

export default useAuthRedirect;
