const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/order`);
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await res.json();
  return data.data;
}

export async function updateOrderStatus(orderId, status) {
  await fetch(`${API_BASE}/order/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

export async function createOrder(orderData) {
  await fetch(`${API_BASE}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
}
