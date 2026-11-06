import { Request, Response } from 'express';
import { db } from '../db';

export const getVendedores = async (req: Request, res: Response) => {
    try {
        const vendedores = await db.vendedor.findMany();
        res.json(vendedores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vendedores' });
    }
};

export const getVendedorById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const vendedor = await db.vendedor.findUnique({
            where: { vendedorId: id },
            include: { ventas: true },
        });

        if (!vendedor) {
            return res.status(404).json({ error: 'Vendedor no encontrado' });
        }

        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vendedor' });
    }
};

export const createVendedor = async (req: Request, res: Response) => {
    try {
        const { nombreVendedor, comision } = req.body;
        const nuevoVendedor = await db.vendedor.create({
            data: {
                nombreVendedor,
                comision: Number(comision),
            },
        });
        res.status(201).json({ mensaje: 'Vendedor creado con éxito', vendedor: nuevoVendedor });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el vendedor' });
    }
};

export const updateVendedor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { nombreVendedor, comision } = req.body;

        const vendedorActualizado = await db.vendedor.update({
            where: { vendedorId: id },
            data: {
                ...(nombreVendedor && { nombreVendedor }),
                ...(comision !== undefined && { comision: Number(comision) }),
            },
        });

        res.json({ mensaje: 'Vendedor actualizado con éxito', vendedor: vendedorActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vendedor' });
    }
};

export const deleteVendedor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await db.vendedor.delete({
            where: { vendedorId: id },
        });
        res.json({ mensaje: 'Vendedor eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vendedor' });
    }
};