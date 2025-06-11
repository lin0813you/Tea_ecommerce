import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class InventoryItem extends Model {}

InventoryItem.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lowStockThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'InventoryItem',
    tableName: 'InventoryItem',
  },
);

export default InventoryItem;
