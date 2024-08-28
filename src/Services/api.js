import axiosInstance from "./axiosInstance";

// Sign up
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post("auth/signup", userData);
    console.log("Response => ", response);
    return response.data;
  } catch (error) {
    console.error("Sign-up error: ", error);
    throw error;
  }
};
// Sign in

export const signIn = async (userData) => {
  try {
    const response = await axiosInstance.post("auth/signin", userData);
    console.log("Response => ", response);
    return response.data;
  } catch (error) {
    console.error("Sign-in error: ", error);
    throw error;
  }
};
