import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-green-600 shadow-sm px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-tight text-white">
        Effective Carnival
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6  text-white text-2xl font-medium">
        <NavLink to="/" className={(isActive) => isActive ? 'active' : ""}>Home</NavLink>
        <NavLink to="/About" className={(isActive) => isActive ? 'active' : ""}>About</NavLink>
        <NavLink to="/Villages" className={(isActive) => isActive ? 'active' : ""}>Villages</NavLink>
      </nav>

      {/* Contact Us Button */}
      <div>
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-all duration-200">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
