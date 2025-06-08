// client/src/hooks/useClerkOrders.js
import { useState, useEffect } from 'react';
import { fetchOrders as apiFetchOrders, updateOrderStatus as apiUpdateOrderStatus } from '../api/order';

export function useClerkOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await apiFetchOrders();
      setOrders(data);
    };
    load();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    await apiUpdateOrderStatus(orderId, newStatus);
  };

  return { orders, updateOrderStatus };
}
