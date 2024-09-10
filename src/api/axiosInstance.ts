import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log("REACT_APP_LEARNING_API_URL");
console.log(process.env.REACT_APP_LEARNING_API_URL)

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LEARNING_API_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
