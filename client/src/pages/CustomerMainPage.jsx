// src/pages/CustomerMainPage.jsx
import { useEffect, useState } from "react";
import { fetchProducts }         from "../api/product";
import NavBar                    from "../components/NavBar";
import Carousel                  from "../components/Carousel";

export default function CustomerMainPage() {
  const [products, setProducts] = useState([]);
  const [query,    setQuery]    = useState("");

  // TODO: 之後從 Context 或 API 拿到真正的 user/cartCount
  const mockUser      = { name: "小明" };
  const mockCartCount = 3;

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
      {/* 1. 導覽列放最上方 */}
      <NavBar user={mockUser} cartCount={mockCartCount} />

      {/* 2. 主內容容器 */}
      <div className="container py-4 main-container">
        {/* 3. 輪播 */}
        <Carousel />

      </div>
    </>
  );
}
