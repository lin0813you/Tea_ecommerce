import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts'; // Import useProducts hook
import '../styles/pages/productSearchPage.scss'; 
import { Spinner, Alert, Container } from 'react-bootstrap'; // Added Spinner, Alert, Container

const ProductSearchPage = () => {
  const { products: allProducts, loading, error } = useProducts(); // Use the hook
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const uniqueCategories = ["All", ...Array.from(new Set(allProducts.map((p) => p.type)))];
      setCategories(uniqueCategories);
    }
  }, [allProducts]);

  // This function will now be passed as onChange to SearchBar
  const handleQueryChange = (searchQuery) => {
    setQuery(searchQuery);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === '' || filter === 'All' || product.type === filter;
    return matchesQuery && matchesFilter;
  });

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading products...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-5 pt-5"><Alert variant="danger">Error loading products: {error}</Alert></Container>;
  }

  return (
    <Container className="mt-5 pt-3">
      {/* Pass value and onChange to SearchBar */}
      <SearchBar value={query} onChange={handleQueryChange} /> 
      <div className="filter-bar-container mb-4">
        <FilterBar
          types={categories}
          activeType={filter}
          onSelectType={(key) => setFilter(key)}
        />
      </div>
      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Alert variant="info">No products match your criteria.</Alert>
      )}
    </Container>
  );
};

export default ProductSearchPage;
