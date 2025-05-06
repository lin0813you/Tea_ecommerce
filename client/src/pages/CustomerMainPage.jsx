import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/product';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function CustomerMainPage() {
  const [products, setProducts] = useState([]); 
  const [query, setQuery] = useState('');

 
  useEffect(() => {
    fetchProducts()
      .then(data => {
        console.log('API 回傳：', data);
        // 假設 data 是陣列，就直接設
        setProducts(Array.isArray(data) ? data : data.products);
      })
      .catch(err => console.error(err));
  }, []);
  

  const filtered = (products ?? []).filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="mb-4">茶飲商城</h1>
      <SearchBar value={query} onChange={setQuery} />
      <div className="row g-4">
        {filtered.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
