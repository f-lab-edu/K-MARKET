import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800">K-MARKET</div>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
          Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Shop
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
