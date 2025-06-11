// client/src/hooks/useClerkInventory.js
import { useState, useEffect } from 'react';
import { fetchInventory as apiFetchInventory, requestStock as apiRequestStock } from '../api/inventory';

export function useClerkInventory() {
  const [inventory, setInventory] = useState([]);
  const [lowStockAlertItems, setLowStockAlertItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await apiFetchInventory();
      setInventory(data);
    };
    load();
  }, []);

  useEffect(() => {
    const lowStockItems = inventory.filter(item => item.stock < item.lowStockThreshold);
    setLowStockAlertItems(lowStockItems);
  }, [inventory]);

  const requestStock = async (itemId) => {
    const item = inventory.find(item => item.id === itemId);
    await apiRequestStock(itemId);
    alert(`已為 ${item?.name} 申請補貨。`);
  };

  // Placeholder for future API integration to refresh inventory
  const refreshInventory = async () => {
    const data = await apiFetchInventory();
    setInventory(data);
  };

  return { inventory, lowStockAlertItems, requestStock, refreshInventory };
}
