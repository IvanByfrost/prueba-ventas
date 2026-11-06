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

export const updateVenta = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { vendedorId, productoId, cantidad } = req.body;

        const ventaActual = await db.venta.findUnique({
            where: { ventaId: id },
        });

        if (!ventaActual) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        const nuevoProductoId = productoId || ventaActual.productoId;
        const nuevaCantidad = cantidad !== undefined ? cantidad : ventaActual.cantidad;

        const producto = await db.producto.findUnique({
            where: { productoId: nuevoProductoId },
        });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        let diferenciaStock = 0;

        if (ventaActual.productoId === nuevoProductoId) {
            diferenciaStock = nuevaCantidad - ventaActual.cantidad;
            if (producto.stock < diferenciaStock) {
                return res.status(400).json({ error: 'Stock insuficiente para realizar la actualización' });
            }
        } else {
            if (producto.stock < nuevaCantidad) {
                return res.status(400).json({ error: 'Stock insuficiente en el nuevo producto' });
            }
        }

        const valorTotal = Number(producto.valorUnitario) * nuevaCantidad;

        const ventaActualizada = await db.$transaction(async (tx) => {
            if (ventaActual.productoId !== nuevoProductoId) {
                await tx.producto.update({
                    where: { productoId: ventaActual.productoId },
                    data: { stock: { increment: ventaActual.cantidad } },
                });
                await tx.producto.update({
                    where: { productoId: nuevoProductoId },
                    data: { stock: { decrement: nuevaCantidad } },
                });
            } else if (diferenciaStock !== 0) {
                await tx.producto.update({
                    where: { productoId: nuevoProductoId },
                    data: { stock: { decrement: diferenciaStock } },
                });
            }

            return await tx.venta.update({
                where: { ventaId: id },
                data: {
                    vendedorId: vendedorId || ventaActual.vendedorId,
                    productoId: nuevoProductoId,
                    cantidad: nuevaCantidad,
                    valorTotal,
                },
            });
        });

        res.json({ mensaje: 'Venta actualizada con éxito', venta: ventaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

