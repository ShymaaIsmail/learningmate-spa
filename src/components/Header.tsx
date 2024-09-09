// src/components/Header.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';


const Header: React.FC = () => {
    const { isLoggedIn, logout, userProfile } = useAuth();

    return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Learning mate</h1>
        <nav>
        {isLoggedIn ?(
          <ul className="flex space-x-4">
            <li>
              <a href="#dashboard" className="hover:underline">Dashboard</a>
              </li>
              <li>
              <a href="#learning-plans" className="hover:underline">Learning Plans</a>
              </li>
              <li>
              <button type="submit"
              style={{ width: 200, height: 40, textAlign: 'center' }}
              onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
          ):('')}
        </nav>
      </div>
    </header>
  )};

export default Header;
