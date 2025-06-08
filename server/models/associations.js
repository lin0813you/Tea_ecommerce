import Order from './Order.js';
import OrderItem from './OrderItem.js';

// Define associations between Order and OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

export default function applyAssociations() {}
