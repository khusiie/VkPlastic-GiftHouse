import { Request, Response } from 'express';
import { prismaClient } from '../prisma';
import { ProductSchema } from '../schema/products';
import { NotFoundException } from '../exceptions/not_found';
import { ErrorCode } from '../exceptions/root';

export const createProduct = async (req: Request, res: Response) => {
    // Validation

    const validatedData = ProductSchema.parse(req.body);

    const product = await prismaClient.product.create({
        data: {
            ...validatedData,
        }
    });
    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: productData
        });
        res.json(updatedProduct);

    } catch (err) {
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({ success: true });
    } catch (err) {
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const listProducts = async (req: Request, res: Response) => {
    const { skip, take, search, tags } = req.query;

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search.toString(), mode: 'insensitive' } },
            { description: { contains: search.toString(), mode: 'insensitive' } }
        ];
    }
    if (tags) {
        where.tags = { contains: tags.toString(), mode: 'insensitive' };
    }

    const count = await prismaClient.product.count({ where });
    const products = await prismaClient.product.findMany({
        where,
        skip: +skip! || 0,
        take: +take! || 5
    });
    res.json({
        count, data: products
    });
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        });
        res.json(product);
    } catch (err) {
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany({
        where: {
            name: {
                search: req.query.q?.toString().split(" ").join(" & ")
            },
            description: {
                search: req.query.q?.toString().split(" ").join(" & ")
            },
            tags: {
                search: req.query.q?.toString().split(" ").join(" & ")
            }
        }
    });
    res.json(products);
};