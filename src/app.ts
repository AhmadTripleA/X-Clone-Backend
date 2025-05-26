import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { Router } from './routers';
import { GlobalErrorHandler } from './utils/globalErrorHandler';
import db from './connections/db';
import cookieParser from 'cookie-parser';

const { PORT } = process.env;

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser())

new Router(app);

app.use(GlobalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function shutdown() {
  console.log('Shutting down server...');
  await db.destroy();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}
