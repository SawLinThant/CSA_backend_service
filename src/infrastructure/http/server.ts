import express from 'express';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/errorMiddleware';
import { registerRoutes } from './routes/index';

const app = express();

// CORS is handled at the reverse-proxy / server layer.
// Disable Helmet CORP so it does not block cross-origin API reads.
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(express.json());

registerRoutes(app);

app.use(errorMiddleware);

export default app;
