export async function fetchOrders() {
  const res = await fetch(`/api/order`); // Changed to use proxy
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await res.json();
  return data.data;
}

export async function fetchOrdersByCustomerName(customerName) {
  const res = await fetch(`/api/order?customerName=${encodeURIComponent(customerName)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
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
  const res = await fetch(`/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    throw new Error("Failed to create order");
  }
  // Notify all tabs that orders have been updated
  localStorage.setItem("ordersUpdated", Date.now().toString());
  window.dispatchEvent(new Event("ordersUpdated"));
  const data = await res.json();
  return data.data;
}

export async function cancelOrder(orderId) {
  const res = await fetch(`/api/order/${orderId}/cancel`, {
    method: 'PATCH'
  });
  if (!res.ok) {
    throw new Error('Failed to cancel order');
  }
  const data = await res.json();
  return data.data;
}
