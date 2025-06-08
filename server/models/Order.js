import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Order',
  },
);

export default Order;
