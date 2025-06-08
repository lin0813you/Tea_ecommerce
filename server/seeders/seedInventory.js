import InventoryItem from '../models/InventoryItem.js';

const items = [
  { id: 'ITEM001', name: '紅茶葉', stock: 50, unit: '包', lowStockThreshold: 10 },
  { id: 'ITEM002', name: '綠茶葉', stock: 8, unit: '包', lowStockThreshold: 10 },
  { id: 'ITEM003', name: '珍珠', stock: 20, unit: '公斤', lowStockThreshold: 5 },
  { id: 'ITEM004', name: '牛奶', stock: 15, unit: '瓶', lowStockThreshold: 12 },
  { id: 'ITEM005', name: '糖漿', stock: 30, unit: '公升', lowStockThreshold: 5 },
];

export default async function seedInventory() {
  const count = await InventoryItem.count();
  if (count === 0) {
    await InventoryItem.bulkCreate(items);
    console.log('庫存資料已初始化');
  }
}
