// src/pages/CustomerMainPage.jsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import Carousel from "../components/Carousel";
import HeroSection from "../components/HeroSection"; // Import the new component
import ImageTextSection from "../components/ImageTextSection";

export default function CustomerMainPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  // 動態萃取出所有 type，前面加上「All」
  const types = ["All",
    ...Array.from(new Set(products.map((p) => p.type)))
  ];

  return (
    <>
      {/* 2. 主內容容器 */}
      <div className="container py-4 main-container">
        {/* 3. 輪播 */}
        <Carousel />

        {/* Add the new ImageTextSection component here */}
        <ImageTextSection />

        {/* Add the new HeroSection component here */}
        <HeroSection />
      </div>
    </>
  );
}
