import React from "react";
import { FaBookOpen, FaHistory, FaHeart, FaChartLine } from "react-icons/fa";

const FeaturedCategories = () => {
  const categories = [
    {
      name: "Bestsellers",
      icon: <FaChartLine className="h-8 w-8" />,
      count: 245,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "New Releases",
      icon: <FaBookOpen className="h-8 w-8" />,
      count: 189,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Classics",
      icon: <FaHistory className="h-8 w-8" />,
      count: 312,
      color: "bg-amber-100 text-amber-800",
    },
    {
      name: "Reader's Choice",
      icon: <FaHeart className="h-8 w-8" />,
      count: 178,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books from various categories handpicked by our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 ${category.color}`}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm opacity-80">
                {category.count}+ books available
              </p>
              <button className="mt-4 text-sm font-medium hover:underline">
                View all →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;