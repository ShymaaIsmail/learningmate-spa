import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout, userProfile } = useAuth();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold">Learning Mate</h1>

        <div className="flex items-center space-x-6">
          {isLoggedIn && (
            <div className="text-lg md:text-xl font-medium">
              Hello, <span className="font-semibold">{userProfile?.name}</span>
            </div>
          )}
          
          {isLoggedIn && (
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/dashboard" className="hover:text-yellow-300 transition-colors duration-200">Dashboard</Link>
                </li>
                <li>
                  <Link to="/learning-plans" className="hover:text-yellow-300 transition-colors duration-200">Learning Plans</Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors duration-200"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
