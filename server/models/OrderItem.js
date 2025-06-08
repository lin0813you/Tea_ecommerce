import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
    sugar: {
      type: DataTypes.STRING,
    },
    ice: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'OrderItem',
  },
);

export default OrderItem;
