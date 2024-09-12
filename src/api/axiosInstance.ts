import axios, { AxiosRequestConfig } from 'axios';
import { useAuth } from '../context/AuthContext'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LEARNING_API_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Clone the config object to avoid direct mutation
    const newConfig = { ...config };

    // Get the token from the context or wherever it's stored
    const { userProfile } = useAuth(); // Adjust based on your context or state management

    if (userProfile && userProfile.loginToken) {
      // Ensure headers is an object with the correct type
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${userProfile.loginToken}`, // Use dot notation
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
