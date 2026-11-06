import express from 'express';
import cors from 'cors';
import ventaRoutes from './routes/venta.routes';
import productoRoutes from './routes/producto.routes';
import vendedorRoutes from './routes/vendedor.routes';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

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
app.use('/api/ventas', ventaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/vendedores', vendedorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:\${PORT}`);
});


export default app;
