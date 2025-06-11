export async function fetchOrders() {
  const res = await fetch(`/api/order`); // Changed to use proxy
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await res.json();
  return data.data;
}

export async function updateOrderStatus(orderId, status) {
  await fetch(`/api/order/${orderId}/status`, {
    // Changed to use proxy
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export async function createOrder(orderData) {
  await fetch(`/api/order`, {
    // Changed to use proxy
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
}
