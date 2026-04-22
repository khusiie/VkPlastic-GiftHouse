import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    tags: z.string(),
    stock: z.number().int().min(0).optional().default(0),
});
