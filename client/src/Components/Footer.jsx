import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-yellow-300">BookStore</h3>
            <p className="text-gray-400 mt-1">
              Discover your next favorite book
            </p>
          </div>

          <div className="flex space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Books
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>

          <div className="text-gray-500 text-sm flex items-center">
            <FaHeart className="text-red-400 mr-1" />
            <span>
              Made with love © {new Date().getFullYear()} BookStore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;