// client/src/hooks/useClerkInventory.js
import { useState, useEffect } from 'react';
import { mockClerkInventory } from '../data/mockClerkInventory';

export function useClerkInventory() {
  const [inventory, setInventory] = useState([]);
  const [lowStockAlertItems, setLowStockAlertItems] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setInventory(mockClerkInventory);
  }, []);

  useEffect(() => {
    const lowStockItems = inventory.filter(item => item.stock < item.lowStockThreshold);
    setLowStockAlertItems(lowStockItems);
  }, [inventory]);

  const requestStock = (itemId) => {
    // Logic to request stock from supplier
    const item = inventory.find(item => item.id === itemId);
    console.log(`Stock requested for item ${itemId}: ${item?.name} (simulated API call)`);
    // You might want to update the item's state here, e.g., item.stockRequested = true
    // or call an API to make the request.
    alert(`已為 ${item?.name} 申請補貨。`);
  };

  // Placeholder for future API integration to refresh inventory
  const refreshInventory = () => {
    console.log('Refreshing inventory data (simulated API call)');
    // Potentially re-fetch from mockClerkInventory or an API
    setInventory(mockClerkInventory); 
  };

  return { inventory, lowStockAlertItems, requestStock, refreshInventory };
}
