import axios from "axios";

const ApiUrl = "http://62.72.32.44:8000/api/v1/";

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response ? error.response.data : { message: "Network error" }
    );
  }
);

export default axiosInstance;
