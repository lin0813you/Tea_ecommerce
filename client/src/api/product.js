// src/api/product.js
import axios from "axios";
import { mockProducts } from "../data/mockProducts";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 臨時用：直接回傳 mockProducts 作為 Promise
export function fetchProducts() {
  return Promise.resolve(mockProducts);
}

// 若未來要接真 API，只要把上面註解，再把下面打開：
// export async function fetchProducts() {
//   const res = await axios.get(`${API_BASE}/products`);
//   // 假設後端格式是 { products: [...] }
//   return res.data.products;
// }
