// src/pages/CustomerMainPage.jsx
import React from 'react'; // Removed useEffect, useState
// import { fetchProducts } from "../api/product"; // Removed old API call
import Carousel from "../components/Carousel";
import HeroSection from "../components/HeroSection";
import ImageTextSection from "../components/ImageTextSection";
// We are not directly using products or types in this component's JSX currently.
// If HeroSection or ImageTextSection need products, they should use the useProducts hook themselves.
// import { useProducts } from '../hooks/useProducts'; // Not strictly needed here if children fetch their own data

export default function CustomerMainPage() {
  // const { products, loading, error } = useProducts(); // Products would be available here if needed

  // If loading or error states need to be handled at this page level:
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading page: {error}</p>;

  return (
    <>
      {/* Main content container */}
      {/* container class might be from bootstrap, ensure it's used correctly or styled */}
      <div className="py-4 main-container"> {/* Removed bootstrap container, assuming main-container handles layout */}
        <Carousel />
        <ImageTextSection />
        <HeroSection />
      </div>
    </>
  );
}
