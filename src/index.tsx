import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider, useAuth } from './context/AuthContext';
import { setupAxiosInterceptors } from './api/axiosInstance';

// Define the props type for AxiosInterceptorSetup component
interface AxiosInterceptorSetupProps {
  children: React.ReactNode;
}

const AxiosInterceptorSetup: React.FC<AxiosInterceptorSetupProps> = ({ children }) => {

  React.useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setupAxiosInterceptors(savedToken); 
  }, []); 

  return <><div/>{children}</>;
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <AxiosInterceptorSetup> {/* Wrap the App with Axios Interceptor Setup */}
            <App />
          </AxiosInterceptorSetup>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
