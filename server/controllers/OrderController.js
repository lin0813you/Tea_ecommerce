import OrderService from '../services/OrderService.js';

export const getOrders = async (req, res, next) => {
  try {
    const { customerName } = req.query;
    const orders = customerName
      ? await OrderService.getByCustomerName(customerName)
      : await OrderService.getAll();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await OrderService.getById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await OrderService.placeOrder(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    if (err.message === 'customerName is required') {
      return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const updated = await OrderService.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const updated = await OrderService.cancelOrder(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
