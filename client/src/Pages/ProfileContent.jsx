import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const ProfileContent = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingCount, setReadingCount] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://books-library-management-1.onrender.com/api/mybooks/myall_books?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const readingBooks = response.data.filter(
          (book) => book.readingStatus === "reading"
        );
        setReadingCount(readingBooks.length);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchBooks();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-800 font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Account Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600">Books Added</p>
                <p className="text-2xl font-bold text-gray-800">
                  {books.length}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600">Books Read</p>
                <p className="text-2xl font-bold text-gray-800">
                  {readingCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
