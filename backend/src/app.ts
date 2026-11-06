import express from 'express';
import cors from 'cors';

const app = express();

app.set('trust proxy', 'loopback, uniquelocal');

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

export default app;
