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

        const valorTotal = Number(producto.valorUnitario) * cantidad;

        const [venta] = await db.$transaction([
            db.venta.create({
                data: {
                    vendedorId,
                    productoId,
                    cantidad,
                    valorTotal,
                },
            }),
            db.producto.update({
                where: { productoId: productoId },
                data: { stock: producto.stock - cantidad },
            }),
        ]);

        res.status(201).json({ mensaje: 'Venta registrada con éxito', venta });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la venta' });
    }
};

export const getVentas = async (req: Request, res: Response) => {
    try {
        const ventas = await db.venta.findMany({
            include: {
                vendedor: true,
                producto: true,
            },
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

export const getVentaById = async (req: Request, res: Response) => {
    try {

        const ventaId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const venta = await db.venta.findUnique({
            where: { ventaId: ventaId },
            include: {
                vendedor: true,
                producto: true,
            },
        });

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};

export const deleteVenta = async (req: Request, res: Response) => {
    try {
        const ventaId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        await db.venta.delete({
            where: { ventaId: ventaId },
        });

        res.json({ mensaje: 'Venta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};
