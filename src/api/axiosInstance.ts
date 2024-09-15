
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LEARNING_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to set up interceptors
export const setupAxiosInterceptors = (token: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem('token')
      if (authToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
