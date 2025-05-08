// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { fetchProducts }         from "../api/product";
import ProductCard               from "../components/ProductCard";
import SearchBar                 from "../components/SearchBar";
import NavBar                    from "../components/NavBar";
import Carousel                  from "../components/Carousel";
import FilterBar                 from "../components/FilterBar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [query,    setQuery]    = useState("");
  const [filter,   setFilter]   = useState("All");

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

  // 1. 動態萃取出所有 type，前面加上「All」
  const types = ["All", 
    ...Array.from(new Set(products.map((p) => p.type)))
  ];

  // 2. 先依 filter（類別）再依 query（關鍵字）過濾
  const filtered = (products ?? [])
    .filter((p) => filter === "All" || p.type === filter)
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
      <div className="products-page main-container">
        <div className="controls my-4">
          <SearchBar value={query} onChange={setQuery} />
          <FilterBar types={types} activeType={filter} onSelectType={setFilter} />
        </div>
  
        <div className="row g-4">
          {filtered.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    )
}
