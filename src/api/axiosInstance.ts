// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.LEARNING_API_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Set up interceptors for request/response
axiosInstance.interceptors.request.use(
  (config) => 
    // Modify request config if needed (e.g., add auth tokens)
    config
  ,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => 
    // Handle errors globally (e.g., log errors, show notifications)
    Promise.reject(error)
);

export default axiosInstance;
