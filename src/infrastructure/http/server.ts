import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware';
import { registerRoutes } from './routes/index';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

registerRoutes(app);

app.use(errorMiddleware);

export default app;

