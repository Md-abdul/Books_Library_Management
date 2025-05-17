import React from 'react';
import { FaBook, FaPlusCircle, FaUser, FaSignOutAlt, FaHome, FaCog } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
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
                to="/"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaHome className="mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-3 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                <FaUser className="mr-3" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-book"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaPlusCircle className="mr-3" />
                <span>Add New Book</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-books"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaBook className="mr-3" />
                <span>My Books</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                <FaCog className="mr-3" />
                <span>Settings</span>
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

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-800 font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-800 font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-800 font-medium">January 2023</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Books Added</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Books Read</p>
                    <p className="text-2xl font-bold text-gray-800">8</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Reviews</p>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Favorites</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recently Added Books</h2>
              <Link
                to="/my-books"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample book cards - replace with actual data */}
              {[1, 2, 3].map((book) => (
                <div key={book} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-400">
                    <FaBook className="text-4xl" />
                  </div>
                  <h3 className="font-medium text-gray-800">Book Title {book}</h3>
                  <p className="text-sm text-gray-500 mb-2">Author Name</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;