
import { useState, useEffect } from 'react';
import { fetchProducts as apiFetchProducts } from '../api/product.js'; // Import the api function

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the imported API function
        const data = await apiFetchProducts(); 
        // The existing apiFetchProducts returns mockProducts directly,
        // so we don't need to access a .products property unless the API changes.
        setProducts(data); 
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
      }
      setLoading(false);
    };

    loadProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return { products, loading, error };
};
