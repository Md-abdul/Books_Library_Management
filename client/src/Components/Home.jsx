import React from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import FeaturedCategories from "./FeaturedCategories";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        <HeroSection />
        <FeaturedCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
