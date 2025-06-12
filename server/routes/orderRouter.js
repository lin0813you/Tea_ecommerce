import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/cancel", cancelOrder);

export default router;
