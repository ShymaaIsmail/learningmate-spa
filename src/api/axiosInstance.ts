// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 10000, // Optional: request timeout (10 seconds)
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
