// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Learning mate</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:underline">Home</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

export default Header;
