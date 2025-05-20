import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import productRouter from "./routes/productRouter.js";
import sequelize from './config/database.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();