import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

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
   },{
       sequelize,
       modelName: 'Product',
       tableName: 'Product',
   },
);

export default Product;