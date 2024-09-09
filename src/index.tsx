import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import './index.css'; // Import Tailwind CSS
import App from './App';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root'); // Get the root DOM element

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render
  root.render(
    <React.StrictMode>
      <BrowserRouter>
      <AuthProvider>
      <App />
      </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
