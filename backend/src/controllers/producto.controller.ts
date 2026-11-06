import { Request, Response } from 'express';
import { db } from '../db';

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await db.producto.findMany();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

export const getProductoById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const producto = await db.producto.findUnique({
            where: { productoId: id },
            include: { ventas: true },
        });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

export const createProducto = async (req: Request, res: Response) => {
    try {
        const { nombreProducto, valorUnitario, stock } = req.body;
        const nuevoProducto = await db.producto.create({
            data: {
                nombreProducto,
                valorUnitario: Number(valorUnitario),
                stock: Number(stock),
            },
        });
        res.status(201).json({ mensaje: 'Producto creado con éxito', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

export const updateProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { nombreProducto, valorUnitario, stock } = req.body;

        const productoActualizado = await db.producto.update({
            where: { productoId: id },
            data: {
                ...(nombreProducto && { nombreProducto }),
                ...(valorUnitario !== undefined && { valorUnitario: Number(valorUnitario) }),
                ...(stock !== undefined && { stock: Number(stock) }),
            },
        });

        res.json({ mensaje: 'Producto actualizado con éxito', producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await db.producto.delete({
            where: { productoId: id },
        });
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};