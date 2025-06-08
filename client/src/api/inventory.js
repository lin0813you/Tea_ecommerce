const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchInventory() {
  const res = await fetch(`${API_BASE}/inventory`);
  if (!res.ok) {
    throw new Error('Failed to fetch inventory');
  }
  const data = await res.json();
  return data.data;
}

export async function requestStock(itemId) {
  await fetch(`${API_BASE}/inventory/${itemId}/request`, { method: 'POST' });
}
