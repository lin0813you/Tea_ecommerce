import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import inventoryRouter from "./routes/inventoryRouter.js";
import sequelize from './config/database.js';
import seedUsers from './seeders/seedUsers.js';
import seedInventory from './seeders/seedInventory.js';
import seedProducts from './seeders/seedProducts.js';
import seedOrders from './seeders/seedOrders.js';
// Initialize model associations
import './models/associations.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/inventory", inventoryRouter);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // 確保資料表結構與 model 相符
    await sequelize.sync({ alter: true });

    // 初始化假資料
    await seedUsers();
    await seedInventory();
    await seedProducts();
    await seedOrders();

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();