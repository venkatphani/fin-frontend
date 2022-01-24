import axios from "axios";

let jwtToken = "";

export const setToken = (token) => {
  jwtToken = token;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:2020/",
  timeout: 120 * 1000,
});

axiosInstance.interceptors.request.use(
  (axiosConfig) => {
    const tempConfig = axiosConfig;
    if (jwtToken) {
      tempConfig.headers.Authorization = jwtToken;
    }
    return tempConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
