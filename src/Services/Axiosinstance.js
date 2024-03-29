import axios from "axios";
const token = localStorage.getItem("locaToken");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { Authorization: `Bearer ${token}` },
});



// create a axios insterceptor here
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
