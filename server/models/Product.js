import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Product extends Model{}

Product.init(
    {
       id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
       },
       name: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       description: {
           type: DataTypes.TEXT,
       },
       price: {
         type: DataTypes.DOUBLE,
         allowNull: false,
       },
       imageUrl: {
         type: DataTypes.STRING,
       },
       type: {
         type: DataTypes.STRING,
       },
   },{
       sequelize,
       modelName: 'Product',
       tableName: 'Product',
   },
);

export default Product;