// client/src/hooks/useClerkOrders.js
import { useState, useEffect, useCallback } from 'react';
import { fetchOrders as apiFetchOrders, updateOrderStatus as apiUpdateOrderStatus } from '../api/order';

export function useClerkOrders() {
  const [orders, setOrders] = useState([]);

  const load = useCallback(async () => {
    const data = await apiFetchOrders();
    const normalized = data.map((order) => ({
      ...order,
      // Sequelize returns associated items under `OrderItems` by default.
      // Normalize to `items` for the UI components.
      items: order.items || order.OrderItems || [],
    }));
    setOrders(normalized);
  }, []);

  useEffect(() => {
    load();

    const handleStorage = (e) => {
      if (e.key === 'ordersUpdated') {
        load();
      }
    };
    const handleUpdated = () => load();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('ordersUpdated', handleUpdated);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('ordersUpdated', handleUpdated);
    };
  }, [load]);

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
