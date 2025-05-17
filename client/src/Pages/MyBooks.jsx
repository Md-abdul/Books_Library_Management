import React, { useState, useEffect } from "react";
import { FaBook, FaEdit, FaPlusCircle, FaStar, FaTrash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchBooks();
  }, [user]);

   const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://books-library-management-1.onrender.com/api/mybooks/api/mybooks/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    }
  };

   const updateReadingStatus = async (bookId, newStatus) => {
    try {
      const response = await axios.put(
        `https://books-library-management-1.onrender.com/api/mybooks/${bookId}`,
        { readingStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBooks(books.map(book => 
        book._id === bookId ? response.data.book : book
      ));
      toast.success("Reading status updated");
    } catch (error) {
      console.error("Error updating reading status:", error);
      toast.error("Error updating reading status");
    }
  };

   const updateRating = async (bookId, newRating) => {
    try {
      const response = await axios.put(
        `https://books-library-management-1.onrender.com/api/mybooks/${bookId}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBooks(books.map(book => 
        book._id === bookId ? response.data.book : book
      ));
      toast.success("Rating updated");
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("Error updating rating");
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">My Books</h2>
        <Link
          to="/profile/add-book"
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow transition"
        >
          <FaPlusCircle className="mr-2" /> Add Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">You haven't added any books yet.</p>
          <Link
            to="/profile/add-book"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <FaPlusCircle className="mr-1" /> Add your first book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300 border border-gray-100"
            >
              <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaBook className="text-5xl text-gray-300" />
                )}
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>

                 <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reading Status
                  </label>
                  <select
                    value={book.readingStatus}
                    onChange={(e) => updateReadingStatus(book._id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-${star <= book.rating ? 'yellow-400' : 'gray-300'} text-xl`}
                        onClick={() => updateRating(book._id, star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      book.availability
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.availability ? "Available" : "Unavailable"}
                  </span>
                  <div className="flex space-x-3">
                    <Link
                      to={`/profile/edit-book/${book._id}`}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition"
                      title="Edit Book"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition"
                      title="Delete Book"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
