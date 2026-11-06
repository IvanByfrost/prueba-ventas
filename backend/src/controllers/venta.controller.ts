// src/controllers/venta.controller.ts
import { Request, Response } from 'express';
import { db } from '../db';

export const createVenta = async (req: Request, res: Response) => {
    try {
        const { vendedorId, productoId, cantidad } = req.body;

        const producto = await db.producto.findUnique({ where: { productoId: productoId } });
        const vendedor = await db.vendedor.findUnique({ where: { vendedorId: vendedorId } });

        if (!producto || !vendedor) {
            return res.status(404).json({ error: 'Producto o vendedor no encontrado' });
        }

        if (producto.stock < cantidad) {
            return res.status(400).json({ error: 'Inventario insuficiente para realizar la venta' });
        }

        const total = Number(producto.valorUnitario) * cantidad;

        const [venta] = await db.$transaction([
            db.venta.create({
                data: {
                    vendedorId,
                    productoId,
                    cantidad,
                    total,
                },
            }),
            db.producto.update({
                where: { id: productoId },
                data: { stock: producto.stock - cantidad },
            }),
        ]);

        res.status(201).json({ mensaje: 'Venta registrada con éxito', venta });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la venta' });
    }
};