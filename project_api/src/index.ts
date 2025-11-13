import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'product-api' });
  });
  app.use('/products', productsRouter);
  return app;
}

export function start(port = Number(process.env.PORT) || 3001) {
  const app = createApp();
  const server = app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      const next = port + 1;
      if (next <= port + 10) {
        console.warn(`Port ${port} in use, trying ${next}...`);
        start(next);
      } else {
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  });
  return server;
}

if (require.main === module) {
  start();
}
