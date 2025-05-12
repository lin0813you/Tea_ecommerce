import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import productsRouter from "./routes/productsRouter";
import sequelize from './config/database';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

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