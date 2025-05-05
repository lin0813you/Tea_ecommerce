import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL; // 在 .env 中設定

export async function fetchProducts() {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data; // 假設回傳 { products: […] }
}
