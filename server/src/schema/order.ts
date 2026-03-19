import { z } from 'zod';

export const ChangeOrderStatusSchema = z.object({
    status: z.enum(['PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']),
});
