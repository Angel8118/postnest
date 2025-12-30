import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoryResponseSchema = z.array(CategorySchema);

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

/* Shopping Cart Item Schema */
export const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: z.number(),
    quantity: z.number().min(1)
})
export const ShoppingCartResponseSchema = z.array(ShoppingCartContentsSchema);

export const CouponResponseSchema = z.object({
  name: z.string().default(""),
  message: z.union([z.string(), z.array(z.string())])
    .transform(m => Array.isArray(m) ? m.join(", ") : m),
  percentage: z.coerce.number().min(0).max(100).default(0),
});

export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartContentsSchema>;
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;