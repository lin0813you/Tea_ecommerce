// src/api/product.js

export async function fetchProducts() {
  const res = await fetch(`/api/product`); // Changed to use proxy
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.data;
}
