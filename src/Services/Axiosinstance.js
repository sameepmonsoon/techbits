import axios from "axios";
const token = localStorage.getItem("locaToken");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    console.log(config.url);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
