import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';

class OrderService {
  static async getAll() {
    return await Order.findAll({ include: OrderItem });
  }

  static async getById(id) {
    return await Order.findByPk(id, { include: OrderItem });
  }

  static async create(data) {
    return await Order.create(data);
  }

  static async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    return await order.update({ status });
  }
}

export default OrderService;
