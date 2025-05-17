import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowRight, FaArrowLeft, FaStar } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";

const HeroSection = () => {
  const [currentBook, setCurrentBook] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBooks = [
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.5,
      cover:
        "https://www.elocalshops.com/cdn/shop/products/IMG_20211210_185150_752x700.jpg?v=1639142632",
      description:
        "A psychological thriller about a woman who shoots her husband and then stops speaking.",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.8,
      cover:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Build good habits and break bad ones with proven strategies.",
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.3,
      cover:
        "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
      description:
        "Between life and death there is a library where each book represents a different life path.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBook((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBook = () => {
    setCurrentBook((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevBook = () => {
    setCurrentBook(
      (prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length
    );
  };

  return (
    <section className="relative bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Your Next{" "}
              <span className="text-yellow-300">Favorite Book</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Explore thousands of books across all genres. Join our community
              of book lovers today!
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for books, authors, genres..."
                className="w-full py-3 px-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-3 text-indigo-800 hover:text-indigo-900">
                <FaSearch className="h-5 w-5" />
              </button>
            </div>

            <div className="flex space-x-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                Browse Collection
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-indigo-900 font-semibold py-2 px-6 rounded-lg transition duration-300">
                Join Book Club
              </button>
            </div>
          </div>

          {/* Right Column - Book Carousel */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition duration-500">
              <div className="relative h-64 md:h-80">
                <img
                  src={featuredBooks[currentBook].cover}
                  alt={featuredBooks[currentBook].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {featuredBooks[currentBook].title}
                  </h3>
                  <p className="text-gray-200">
                    {featuredBooks[currentBook].author}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(featuredBooks[currentBook].rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-200">
                      {featuredBooks[currentBook].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevBook}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md text-indigo-800 hover:bg-indigo-100 transition"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextBook}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md text-indigo-800 hover:bg-indigo-100 transition"
            >
              <FaArrowRight className="h-5 w-5" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {featuredBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBook(index)}
                  className={`h-2 w-2 rounded-full ${
                    currentBook === index ? "bg-yellow-400 w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Book Elements */}
      <GiBookCover className="absolute top-10 left-10 text-white/10 h-32 w-32 -rotate-12 hidden lg:block" />
      <GiBookCover className="absolute bottom-10 right-10 text-white/10 h-32 w-32 rotate-12 hidden lg:block" />
    </section>
  );
};

export default HeroSection;
