import axios from "axios";
import { mockClerkInventory } from "../data/mockClerkInventory";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 臨時用：直接回傳 mockClerkInventory
export function fetchInventory() {
  return Promise.resolve(mockClerkInventory);
}

// export async function fetchInventory() {
//   const res = await axios.get(`${API_BASE}/inventory`);
//   return res.data.items;
// }

export async function requestStock(itemId) {
  // return axios.post(`${API_BASE}/inventory/${itemId}/request`);
  console.log(`Would request stock for item ${itemId}`);
  return Promise.resolve();
}
