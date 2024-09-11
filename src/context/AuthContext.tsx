/* eslint-disable no-console */
// AuthContext.tsx
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, UserProfile } from '../types/authTypes';
import getLoginToken from '../api/services/authService';


// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [googleToken, setGoogleToken] = useState<string>('');
  const { loginToken, isLoading, error, fetchData } = getLoginToken(googleToken);

  const login = (googleTokenData: string) => {
    // Decode the token to get user information
    const profile: UserProfile = jwtDecode(googleTokenData);
    console.log('Decoded Token:', profile);
    console.log('Google Token:', googleTokenData);
    setGoogleToken(googleTokenData);
    fetchData(googleTokenData);
    if(loginToken)
    { 
      setIsLoggedIn(true);
      profile.loginToken = loginToken;
      setUserProfile(profile);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate('/');
  };

  // Memoize the context value to prevent unnecessary re-renders
  const authContextValue = useMemo(() => ({
    isLoggedIn,
    userProfile,
    login,
    logout,
  }), [isLoggedIn, userProfile]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
