import express, { Application } from 'express';
import cors from 'cors';
import { bookRoutes } from './app/modules/bookShop/bookStreo.routes';
const app: Application = express();

//parsers
app.use(cors());
app.use(express.json());
//application routes
app.use('/api', bookRoutes);
app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

export default app;
