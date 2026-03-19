import { Request, Response } from 'express';
import { prismaClient } from '../prisma';
import { CreateCartSchema, ChangeQuantitySchema } from '../schema/cart';
import { NotFoundException } from '../exceptions/not_found';
import { ErrorCode } from '../exceptions/root';

export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = CreateCartSchema.parse(req.body);

    // Check if product exists
    let product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: { id: validatedData.productId }
        });
    } catch (err) {
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }

    // Check if item already exists in cart
    const existingCartItem = await prismaClient.cartItem.findUnique({
        where: {
            userId_productId: {
                userId: req.user.id,
                productId: validatedData.productId
            }
        }
    });

    if (existingCartItem) {
        // Update quantity if item already in cart
        const updatedCartItem = await prismaClient.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + validatedData.quantity }
        });
        res.json(updatedCartItem);
    } else {
        // Create new cart item
        const cartItem = await prismaClient.cartItem.create({
            data: {
                userId: req.user.id,
                productId: validatedData.productId,
                quantity: validatedData.quantity
            }
        });
        res.json(cartItem);
    }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: +req.params.id,
                userId: req.user.id
            }
        });
        res.json({ success: true });
    } catch (err) {
        throw new NotFoundException('Cart item not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body);

    try {
        const updatedCart = await prismaClient.cartItem.update({
            where: {
                id: +req.params.id,
                userId: req.user.id
            },
            data: { quantity: validatedData.quantity }
        });
        res.json(updatedCart);
    } catch (err) {
        throw new NotFoundException('Cart item not found!', ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: { userId: req.user.id },
        include: {
            product: true
        }
    });
    res.json(cart);
};
