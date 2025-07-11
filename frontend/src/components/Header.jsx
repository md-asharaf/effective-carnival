import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-teal-300 shadow-sm px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-tight text-black">
        NESTQUEST
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6  text-black font-medium">
        <a href="#buy" className="hover:text-gray-700">Home</a>
        <a href="#rent" className="hover:text-gray-700">Villages</a>
        <a href="#rent" className="hover:text-gray-700">Exclussive Experiences</a>
        <a href="#about" className="hover:text-gray-700">About</a>
      </nav>

      {/* Contact Us Button */}
      <div>
        <button className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-all duration-200">
          Login/Register
        </button>
      </div>
    </header>
  );
};

export default Header;
