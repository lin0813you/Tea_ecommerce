import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts'; // Assuming mock data for now
import '../styles/pages/productSearchPage.scss'; // Import the new SCSS file


const ProductSearchPage = () => { // Renamed component to ProductSearchPage
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For this example, we'll use mock data
    setProducts(mockProducts);
  }, []);

  // 1. 動態萃取出所有 category，前面加上「All」 (Assuming category is the correct prop for filtering)
  const categories = ["All",
    ...Array.from(new Set(products.map((p) => p.type)))
  ];

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  // 2. 先依 filter（類別）再依 query（關鍵字）過濾

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === '' || filter === 'All' || product.type === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <div className="filter-bar-container">
        <FilterBar
          types={categories}
          activeType={filter}
          onSelectType={(key) => setFilter(key)} // Using onSelectType to match FilterBar prop name
        />
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSearchPage;