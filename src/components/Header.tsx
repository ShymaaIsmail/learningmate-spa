import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout, userProfile } = useAuth();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-4">
  {/* Logo */}
  <img src="../learningmate_logo.png" alt="Learningmate Logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full" />

  {/* Title and Slogan */}
  <div>
    <h1 className="text-2xl md:text-3xl font-bold">
      <Link to="/">Learningmate</Link>
    </h1>
    <p className="text-sm md:text-base text-gray-600">Plan Today, Learn Tomorrow</p> {/* Slogan */}
  </div>
</div>

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
