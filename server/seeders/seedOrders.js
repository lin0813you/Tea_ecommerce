import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';

const orders = [
  {
    id: 'ORD001',
    customerName: '劉備',
    status: '新訂單',
    items: [
      { name: '珍珠奶茶', quantity: 2, size: '大杯', sugar: '半糖', ice: '少冰' },
      { name: '百香果綠茶', quantity: 1, size: '中杯', sugar: '正常糖', ice: '正常冰' },
    ],
  },
  {
    id: 'ORD002',
    customerName: '關羽',
    status: '製作中',
    items: [
      { name: '冬瓜茶', quantity: 1, size: '大杯', sugar: '微糖', ice: '去冰' },
    ],
  },
  {
    id: 'ORD003',
    customerName: '張飛',
    status: '新訂單',
    items: [
      { name: '芋頭鮮奶', quantity: 3, size: '中杯', sugar: '少糖', ice: '微冰' },
      { name: '仙草凍奶茶', quantity: 1, size: '大杯', sugar: '無糖', ice: '正常冰' },
    ],
  },
];

export default async function seedOrders() {
  const count = await Order.count();
  if (count === 0) {
    for (const ord of orders) {
      const { items, ...orderData } = ord;
      await Order.create(orderData);
      await OrderItem.bulkCreate(items.map(i => ({ ...i, orderId: ord.id })));
    }
    console.log('訂單資料已初始化');
  }
}
