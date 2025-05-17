import React, { useState, useRef } from "react";
import {
  FaBook,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        
          <div className="flex items-center">
            <Link to={"/"}>
              <div className="flex-shrink-0 flex items-center">
                <FaBook className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  BookStore
                </span>
              </div>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link
                  to="/all_books"
                  className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                 All Books
                </Link>
                
              </div>
            </div>
          </div>

          
          <div className="hidden md:flex items-center">
           
            <div className="flex items-center space-x-4">
              {user ? (
                <div
                  className="relative"
                  ref={dropdownRef}
                  
                >
                  <Link to={'/profile'}>
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                    <FaChevronDown className="h-3 w-3 text-gray-500" />
                  </div>
                  </Link>
                  
                </div>
              ) : (
                <Link to="/login">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FaUser className="h-6 w-6" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

   
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/books"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Books
          </Link>
          <Link
            to="/categories"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
        {user ? (
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5">
              <Link
                to="/login"
                className="block w-full px-3 py-2 rounded-md text-center font-medium text-indigo-600 hover:text-indigo-500 hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            </div>
            <div className="mt-3 px-2">
              <Link
                to="/register"
                className="block w-full px-3 py-2 rounded-md text-center font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Create account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
