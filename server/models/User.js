import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
  },
);

export default User;
