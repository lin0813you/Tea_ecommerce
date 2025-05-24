// client/src/hooks/useClerkOrders.js
import { useState, useEffect } from 'react';
import { mockClerkOrders } from '../data/mockClerkOrders';

export function useClerkOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setOrders(mockClerkOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // Add API call to update order status in the backend
    console.log(`Order ${orderId} status updated to ${newStatus} (simulated API call)`);
  };

  return { orders, updateOrderStatus };
}
