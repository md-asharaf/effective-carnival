import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-500 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo and tagline */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-3">NESTQUEST</h1>
          <p className="text-sm">
            Your trusted partner in finding the perfect home.
          </p>
        </div>

        {/* Buy & Rent Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Properties</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#buy" className="hover:text-white">Buy</a></li>
            <li><a href="#rent" className="hover:text-white">Rent</a></li>
            <li><a href="#sell" className="hover:text-white">Sell</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home-loans" className="hover:text-white">Home Loans</a></li>
            <li><a href="#valuation" className="hover:text-white">Property Valuation</a></li>
            <li><a href="#consultation" className="hover:text-white">Consultation</a></li>
          </ul>
        </div>

        {/* About & Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#careers" className="hover:text-white">Careers</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center">
        © {new Date().getFullYear()} NESTQUEST. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
