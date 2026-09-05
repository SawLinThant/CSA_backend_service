import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { getCorsOrigins } from '../../config/env';
import { errorMiddleware } from './middleware/errorMiddleware';
import { registerRoutes } from './routes/index';

const app = express();
const allowedOrigins = getCorsOrigins();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients (curl, health checks) with no Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json());

registerRoutes(app);

app.use(errorMiddleware);

export default app;

