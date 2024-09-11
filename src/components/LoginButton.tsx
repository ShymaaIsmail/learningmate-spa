/* eslint-disable no-console */
// LoginButton.tsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth(); // Get login and logout functions from the context

  const onSignInSuccess = (response: any) => {
    const { credential } = response;
    if (credential) {
      // Set the user profile information using the login function from context
      login(credential); // Update the context state
      navigate('dashboard'); // Navigate to dashboard upon successful login
    } else {
      console.log('No credential found');
    }
  };

  const onSignInError = () => {
    console.error('Google Sign-In was unsuccessful.');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={onSignInSuccess}
          onError={onSignInError}
          text="signin_with"
          size="large"
        />
      ) : (
        <button
          type="button"
          style={{ width: 200, height: 40, textAlign: 'center' }}
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginButton;
