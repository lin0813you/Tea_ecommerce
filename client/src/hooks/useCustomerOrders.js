import { useState, useEffect, useCallback } from 'react';
import { fetchOrdersByCustomerName, cancelOrder as apiCancelOrder } from '../api/order';
import { useAuth } from './useAuth';

export function useCustomerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const load = useCallback(async () => {
    if (!user) return;
    const data = await fetchOrdersByCustomerName(user.name || user.username);
    const normalized = data.map((order) => ({
      ...order,
      items: order.items || order.OrderItems || [],
    }));
    setOrders(normalized);
  }, [user]);

  useEffect(() => {
    load();
    const handleUpdated = () => load();
    window.addEventListener('ordersUpdated', handleUpdated);
    return () => {
      window.removeEventListener('ordersUpdated', handleUpdated);
    };
  }, [load]);

  const cancel = async (id) => {
    await apiCancelOrder(id);
    await load();
  };

  return { orders, cancelOrder: cancel, reload: load };
}
