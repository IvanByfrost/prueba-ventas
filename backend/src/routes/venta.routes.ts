import { Router } from 'express';
import { createVenta, getVentas, getVentaById, deleteVenta, updateVenta } from '../controllers/venta.controller';

const router = Router();

router.get('/', getVentas);
router.get('/:id', getVentaById);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

export default router;