import express from 'express';
import {
  getInventory,
  requestStock,
} from '../controllers/InventoryController.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/:id/request', requestStock);

export default router;
