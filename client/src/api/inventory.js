export async function fetchInventory() {
  const res = await fetch(`/api/inventory`); // Changed to use proxy
  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }
  const data = await res.json();
  return data.data;
}

export async function requestStock(itemId) {
  await fetch(`/api/inventory/${itemId}/request`, { method: "POST" }); // Changed to use proxy
}
