import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000"',
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("axios interceptor part 1");

    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
