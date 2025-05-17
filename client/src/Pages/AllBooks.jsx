import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaBookOpen,
  FaRegBookmark,
  FaBookmark,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/mybooks/");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const addToMyList = async (book) => {
    if (!user || !token) {
      toast.error("Please login to add books to your list");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5050/api/mybooks/add",
        {
          title: book.title,
          author: book.author,
          coverImage: book.coverImage,
          availability: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Book added to your list successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding book to your list"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          📚 Explore Our Book Collection
        </h1>
        <p className="text-gray-600 text-lg">
          Find your next read and build your personal library
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <FaBookOpen className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            No books found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm
              ? "Try a different search term"
              : "You haven't added any books yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-100"
            >
              <div className="relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-56 object-cover transition duration-300 group-hover:opacity-90"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => toggleFavorite(book._id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
                    title="Add to favorites"
                  >
                    {favorites.includes(book._id) ? (
                      <FaBookmark className="text-yellow-400" />
                    ) : (
                      <FaRegBookmark className="text-gray-400" />
                    )}
                  </button>
                  {user && (
                    <button
                      onClick={() => addToMyList(book)}
                      className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full shadow transition-all duration-200"
                      title="Add to my list"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">by {book.author}</p>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-yellow-500">
                    <FaStar className="mr-1" /> {book.rating}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      book.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.availability ? "Available" : "Unavailable"}
                  </span>
                </div>

                <button
                  onClick={() => addToMyList(book)}
                  className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium transition cursor-pointer"
                >
                  Add to My List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
