import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { AuthContextType, UserProfile } from '../types/authTypes';

// Utility functions for token management
const getToken = (): string | null => localStorage.getItem('token');
const setToken = (token: string): void => localStorage.setItem('token', token);
const removeToken = (): void => localStorage.removeItem('token');

// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [googleToken, setGoogleToken] = useState<string>('');
  const [loginToken, setLoginToken] = useState<string | null>(getToken());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check token validity on mount
    if (loginToken) {
      try {
        const profile: UserProfile = jwtDecode(loginToken);
        setIsLoggedIn(true);
        setUserProfile(profile);
      } catch (err) {
        console.error('Error decoding token:', err);
        setError('Failed to decode token');
        removeToken();
      }
    }
  }, [loginToken]);

  useEffect(() => {
    const fetchLoginToken = async () => {
      if (googleToken.length === 0) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(`${process.env.REACT_APP_LEARNING_API_URL}auth/login/`, { google_token: googleToken });
        const token = response?.data?.token;
        setLoginToken(token);
        setToken(token);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoginToken();
  }, [googleToken]);

  const login = (googleTokenData: string) => {
    setGoogleToken(googleTokenData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setLoginToken(null);
    removeToken();
    navigate('/');
  };

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      userProfile,
      login,
      logout,
    }),
    [isLoggedIn, userProfile]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};