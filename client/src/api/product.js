// src/api/product.js
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/product`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.data;
}
