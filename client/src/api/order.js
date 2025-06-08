import axios from "axios";
import { mockClerkOrders } from "../data/mockClerkOrders";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 臨時用：直接回傳 mockClerkOrders
export function fetchOrders() {
  return Promise.resolve(mockClerkOrders);
}

// export async function fetchOrders() {
//   const res = await axios.get(`${API_BASE}/orders`);
//   return res.data.orders;
// }

// 更新訂單狀態
export async function updateOrderStatus(orderId, status) {
  // return axios.patch(`${API_BASE}/orders/${orderId}`, { status });
  console.log(`Would update order ${orderId} to status ${status}`);
  return Promise.resolve();
}

// 建立新訂單
export async function createOrder(orderData) {
  // return axios.post(`${API_BASE}/orders`, orderData);
  console.log("Would create order", orderData);
  return Promise.resolve();
}
