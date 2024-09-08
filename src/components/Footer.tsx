// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024LEARNING MATE. All rights reserved.</p>
        <div className="mt-2">
          <a href="#privacy" className="text-blue-400 hover:underline">Privacy Policy</a> | 
          <a href="#terms" className="text-blue-400 hover:underline"> Terms of Service</a>
        </div>
      </div>
    </footer>
  );

export default Footer;
