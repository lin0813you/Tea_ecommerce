import InventoryService from '../services/InventoryService.js';

export const getInventory = async (req, res, next) => {
  try {
    const items = await InventoryService.getAll();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

export const requestStock = async (req, res, next) => {
  try {
    await InventoryService.requestStock(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
