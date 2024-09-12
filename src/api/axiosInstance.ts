
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LEARNING_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to set up interceptors
export const setupAxiosInterceptors = (getToken: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
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
