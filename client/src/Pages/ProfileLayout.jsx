import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaBook, FaPlusCircle, FaUser, FaSignOutAlt, FaHome, FaCog } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const ProfileLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            
            <li>
              <Link
                to="/profile"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaUser className="mr-3" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile/add-book"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaPlusCircle className="mr-3" />
                <span>Add New Book</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile/my-books"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaBook className="mr-3" />
                <span>My Books</span>
              </Link>
            </li>
            
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;