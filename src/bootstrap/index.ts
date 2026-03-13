import 'dotenv/config';
import http from 'http';
import app from '../infrastructure/http/server';
import { logger } from '../core/logging/logger';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`HTTP server listening on port ${PORT}`);
});

