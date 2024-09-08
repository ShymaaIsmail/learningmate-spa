import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css'; // Import Tailwind CSS
import App from './App';

const rootElement = document.getElementById('root'); // Get the root DOM element

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
