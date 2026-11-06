import { Router } from 'express';
import { createVenta } from '../controllers/venta.controller';

const router = Router();

router.post('/', createVenta);

export default router;