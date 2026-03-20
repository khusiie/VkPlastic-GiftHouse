import { Request, Response } from 'express';
import { prismaClient } from '../prisma';
import { NotFoundException } from '../exceptions/not_found';
import { ErrorCode } from '../exceptions/root';
import { BadRequestsException } from '../exceptions/bad_requests';

export const createOrder = async (req: Request, res: Response) => {
    // 1. Fetch cart items with products
    const cartItems = await prismaClient.cartItem.findMany({
        where: { userId: req.user.id },
        include: { product: true }
    });

    if (cartItems.length === 0) {
        throw new BadRequestsException('Cart is empty', ErrorCode.PRODUCT_NOT_FOUND);
    }

    // 2. Calculate net amount
    const price = cartItems.reduce((acc, item) => {
        return acc + (item.quantity * Number(item.product.price));
    }, 0);

    // 3. Get shipping address
    const address = await prismaClient.address.findFirst({
        where: { id: req.user.defaultShippingAddress || undefined, userId: req.user.id }
    }) || await prismaClient.address.findFirst({
        where: { userId: req.user.id }
    });

    if (!address) {
        throw new NotFoundException('Shipping address not found!', ErrorCode.ADDRESS_NOT_FOUND);
    }

    // 4. Create order in a transaction
    const order = await prismaClient.$transaction(async (tx: any) => {
        const newOrder = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address.formattedAddress,
                products: {
                    create: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        });

        await tx.orderEvent.create({
            data: {
                orderId: newOrder.id,
                status: 'PENDING'
            }
        });

        // 5. Clear cart
        await tx.cartItem.deleteMany({
            where: { userId: req.user.id }
        });

        return newOrder;
    });

    res.json(order);
};




export const listOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: { userId: req.user.id }
    });
    res.json(orders);
};

export const changeStatus = async (req: Request, res: Response) => {
    const order = await prismaClient.order.findUnique({
        where: { id: +req.params.id }
    });

    if (!order) {
        throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND);
    }

    const updatedOrder = await prismaClient.$transaction(async (tx: any) => {
        const updated = await tx.order.update({
            where: { id: order.id },
            data: { status: req.body.status }
        });

        await tx.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        });

        return updated;
    });

    res.json(updatedOrder);
};

export const listAllOrders = async (req: Request, res: Response) => {
    let whereClause = {};
    const status = req.query.status as string;
    if (status) {
        whereClause = {
            status
        };
    }
    const skip = req.query.skip ? +req.query.skip : 0;
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: skip,
        take: 5
    });
    res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: { id: +req.params.id },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                events: true
            }
        });
        res.json(order);
    } catch (err) {
        throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND);
    }
};

export const cancelOrder = async (req: Request, res: Response) => {
    // Ensure the order belongs to the user and is still pending
    const order = await prismaClient.order.findFirst({
        where: { id: +req.params.id, userId: req.user.id }
    });

    if (!order) {
        throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND);
    }

    if (order.status === 'CANCELLED' || order.status === 'DELIVERED') {
        throw new BadRequestsException('Cannot cancel this order!', ErrorCode.ORDER_UNPROCESSABLE);
    }

    const updatedOrder = await prismaClient.$transaction(async (tx) => {
        const updated = await tx.order.update({
            where: { id: order.id },
            data: { status: 'CANCELLED' }
        });

        await tx.orderEvent.create({
            data: {
                orderId: order.id,
                status: 'CANCELLED'
            }
        });

        return updated;
    });

    res.json(updatedOrder);
};
