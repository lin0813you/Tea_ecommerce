import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';

class OrderService {
  static async getAll() {
    return await Order.findAll({ include: OrderItem });
  }

  static async getByCustomerName(customerName) {
    return await Order.findAll({
      where: { customerName },
      include: OrderItem,
    });
  }

  static async getById(id) {
    return await Order.findByPk(id, { include: OrderItem });
  }

  static async create(data) {
    return await Order.create(data);
  }

  static async placeOrder({ customerName, items }) {
    if (!customerName) {
      throw new Error('customerName is required');
    }
    const id = `ORD${Date.now()}`;
    const order = await Order.create({ id, customerName, status: '新訂單' });
    if (Array.isArray(items) && items.length > 0) {
      await OrderItem.bulkCreate(
        items.map((i) => ({
          orderId: id,
          name: i.name,
          quantity: i.quantity,
          size: i.customization?.size,
          sugar: i.customization?.sugar,
          ice: i.customization?.ice,
        }))
      );
    }
    return await Order.findByPk(id, { include: OrderItem });
  }

  static async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    return await order.update({ status });
  }

  static async cancelOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    if (order.status !== '新訂單') {
      throw new Error('Order cannot be cancelled');
    }
    return await order.update({ status: '已取消' });
  }
}

export default OrderService;
