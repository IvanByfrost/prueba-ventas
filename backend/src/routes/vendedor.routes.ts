import { Router } from 'express';
import {
    getVendedores,
    getVendedorById,
    createVendedor,
    updateVendedor,
    deleteVendedor
} from '../controllers/vendedor.controller.ts';

const router = Router();

router.get('/', getVendedores);
router.get('/:id', getVendedorById);
router.post('/', createVendedor);
router.put('/:id', updateVendedor);
router.delete('/:id', deleteVendedor);

export default router;