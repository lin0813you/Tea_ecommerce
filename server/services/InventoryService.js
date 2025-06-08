import InventoryItem from '../models/InventoryItem.js';

class InventoryService {
  static async getAll() {
    return await InventoryItem.findAll();
  }

  static async requestStock(id) {
    const item = await InventoryItem.findByPk(id);
    if (!item) throw new Error('Item not found');
    return item; // 只是示範，實際應實作補貨邏輯
  }
}

export default InventoryService;
