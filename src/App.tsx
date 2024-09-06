import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from './components/LoginButton';

const App: React.FC = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error('Google Client ID is missing in environment variables.');
    return <div>Error: Missing Google Client ID</div>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoginButton />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
