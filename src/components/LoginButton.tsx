import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  email: string;
  name: string;
  picture: string;
}

const LoginButton: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const onSignInSuccess = (response: any) => {
    const credential = response.credential;
    if (credential) {
      // Decode the token to get user information
      const decodedToken: UserProfile = jwtDecode<UserProfile>(credential);
      console.log('Decoded Token:', decodedToken);

      // Set the user profile information
      setIsLoggedIn(true);
      setUserProfile(decodedToken);
    } else {
      console.log('No credential found');
    }
  };

  const onSignInError = () => {
    console.log('Google Sign-In was unsuccessful.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    console.log('Logged out successfully');
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
