import { db } from "@/config/database";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import {
    CartCreateSchema,
    CartItemUpdateSchema,
    CartItemCreateSchema,
    type Cart,
    type CartCreate,
    type CartWithRelations,
    type CartItemCreate,
    type CartItem,
    type CartItemWithRelations,
    type CartItemUpdate,
} from "@/@types/schema";
import { z } from "zod";
class CartService {
    /**
     * Create a new cart
     */
    async createCart(cartData: CartCreate): Promise<Cart> {
        try {
            const { userId } = CartCreateSchema.parse(cartData);
            // Check if user already has a cart
            const existingCart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (existingCart) {
                throw new APIError(409, "Cart for this user already exists.");
            }
            const cart = await db.carts.create({
                data: {
                    userId,
                },
            });
            logger.info(`[CART_SERVICE] Cart created for user ${userId}`);
            return cart;
        } catch (error: any) {
            if (error instanceof APIError) throw error;
            if (error instanceof z.ZodError) {
                throw new APIError(
                    400,
                    error.errors.map((e) => e.message).join(", ")
                );
            }
            logger.error("[CART_SERVICE] Error creating cart:", error);
            throw new APIError(500, error.message);
        }
    }

    /**
     * Get user cart
     */
    async getCartByUserId(
        userId: string,
        includeRelations: boolean = false
    ): Promise<CartWithRelations | null> {
        try {
            // Check if user exists
            const user = await db.users.findUnique({
                where: { id: userId },
                select: { id: true },
            });

            if (!user) {
                throw new APIError(404, "User not found");
            }

            // Get cart with items
            const cart = await db.carts.findUnique({
                where: { userId },
                include: includeRelations
                    ? {
                          items: true,
                      }
                    : undefined,
            });

            if (!cart) {
                logger.info(`[USER_SERVICE] No cart found for user ${userId}`);
                return null;
            }

            logger.info(
                `[USER_SERVICE] Cart retrieved successfully for user ${userId}`
            );
            return cart;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[USER_SERVICE] Error getting cart for user ${userId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve user cart");
        }
    }

    /**
     * Clear all items from a user's cart
     */
    async clearCartByUserId(
        userId: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Get cart
            const cart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!cart) throw new APIError(404, "Cart not found");
            // Delete all cart items
            await db.cartItem.deleteMany({ where: { cartId: cart.id } });
            logger.info(`[CART_SERVICE] Cleared cart for user ${userId}`);
            return { success: true, message: "Cart cleared successfully" };
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error clearing cart for user ${userId}:`,
                error
            );
            throw new APIError(500, "Failed to clear cart");
        }
    }

    /**
     * Delete a user's cart
     */
    async deleteCartByUserId(
        userId: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            const cart = await db.carts.findUnique({
                where: { userId },
                include: {
                    items: true,
                },
            });
            if (!cart) throw new APIError(404, "Cart not found");
            if (Array.isArray(cart.items) && cart.items.length > 0) {
                throw new APIError(400, "Cart must be empty before deletion");
            }
            // Delete the cart
            await db.carts.delete({ where: { id: cart.id } });
            logger.info(`[CART_SERVICE] Deleted cart with ID ${cart.id}`);
            return { success: true, message: "Cart deleted successfully" };
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error deleting cart with userId ${userId}:`,
                error
            );
            throw new APIError(500, "Failed to delete cart");
        }
    }

    /**
     * Get cart by cart ID (with items)
     */
    async getCartById(
        cartId: string,
        includeRelations: boolean = false
    ): Promise<CartWithRelations | null> {
        try {
            const cart = await db.carts.findUnique({
                where: { id: cartId },
                include: includeRelations
                    ? {
                          items: true,
                          user: true,
                      }
                    : undefined,
            });
            if (!cart) {
                logger.info(`[CART_SERVICE] No cart found with id ${cartId}`);
                return null;
            }
            logger.info(`[CART_SERVICE] Cart retrieved with id ${cartId}`);
            return cart;
        } catch (error) {
            logger.error(
                `[CART_SERVICE] Error getting cart by id ${cartId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart");
        }
    }

    /**
     * Get all carts (with pagination)
     */
    async getAllCarts(
        options: {
            page?: number;
            limit?: number;
            includeRelations?: boolean;
        } = {}
    ): Promise<{
        carts: CartWithRelations[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const { page = 1, limit = 10 } = options;
            const skip = (page - 1) * limit;
            const total = await db.carts.count();
            const carts = await db.carts.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    items: true,
                    user: true,
                },
            });
            const totalPages = Math.ceil(total / limit);
            logger.info(
                `[CART_SERVICE] Retrieved ${carts.length} carts (page ${page}/${totalPages})`
            );
            return { carts, total, page, limit, totalPages };
        } catch (error) {
            logger.error("[CART_SERVICE] Error getting all carts:", error);
            throw new APIError(500, "Failed to retrieve carts");
        }
    }

    /**
     * Get carts by user ID
     */
    async getCartsByIds(
        ids: string[],
        includeRelations: boolean = false
    ): Promise<(Cart | CartWithRelations)[]> {
        try {
            const carts = await db.carts.findMany({
                where: { id: { in: ids } },
                include: includeRelations
                    ? {
                          items: true,
                          user: true,
                      }
                    : undefined,
            });
            logger.info(
                `[CART_SERVICE] Retrieved ${
                    carts.length
                } carts for ids: ${ids.join(", ")}`
            );
            return carts;
        } catch (error) {
            logger.error(
                `[CART_SERVICE] Error getting carts by ids ${ids.join(", ")}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve carts");
        }
    }

    // CART ITEM SERVICES BELOW

    /**
     * Add an item to a cart.
     */
    async createCartItem(
        userId: string,
        itemData: CartItemCreate
    ): Promise<CartItem> {
        try {
            const data = CartItemCreateSchema.parse(itemData);
            // Check if cart exists
            let cart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!cart) {
                // If no cart exists, create one
                cart = await db.carts.create({
                    data: {
                        userId,
                    },
                    select: { id: true },
                });
            }
            if (data.variantId) {
                const variant = await db.variants.findUnique({
                    where: {
                        id: data.variantId,
                        productId: data.productId,
                    },
                });
                if (!variant) {
                    throw new APIError(404, "Variant not found");
                }
                if (variant.stock < data.quantity) {
                    throw new APIError(
                        400,
                        `Variant is out of stock, only ${variant.stock} available`
                    );
                }
            } else {
                const product = await db.products.findUnique({
                    where: {
                        id: data.productId,
                    },
                });
                if (!product) {
                    throw new APIError(404, "Product not found");
                }
                if (product.stock < data.quantity) {
                    throw new APIError(
                        400,
                        `Product is out of stock, only ${product.stock} available`
                    );
                }
            }
            // Check if item already exists in cart (by productId and variantId)
            const existingItem = await db.cartItem.findUnique({
                where: {
                    cartId_productId_variantId: {
                        cartId: cart.id,
                        productId: data.productId,
                        variantId: data.variantId || "",
                    },
                },
            });
            if (existingItem) {
                throw new APIError(409, "Item already exists in cart");
            }
            const cartItem = await db.cartItem.create({
                data: {
                    ...data,
                    cartId: cart.id,
                },
            });
            logger.info(`[CART_SERVICE] Added item to cart ${cart.id}`);
            return cartItem;
        } catch (error: any) {
            if (error instanceof APIError) throw error;
            if (error instanceof z.ZodError) {
                throw new APIError(
                    400,
                    error.errors.map((e: any) => e.message).join(", ")
                );
            }
            logger.error("[CART_SERVICE] Error adding item to cart:", error);
            throw new APIError(500, error.message);
        }
    }

    /**
     * Remove an item from a cart by its id.
     */
    async deleteCartItemById(
        userId: string,
        cartItemId: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            const cart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!cart) throw new APIError(404, "Cart not found");
            // Check if cart item belongs to this cart
            const cartItem = await db.cartItem.findUnique({
                where: { id: cartItemId, cartId: cart.id },
                select: { id: true },
            });
            if (!cartItem)
                throw new APIError(
                    404,
                    "Cart item not found or does not belong to your cart"
                );
            await db.cartItem.delete({ where: { id: cartItemId } });
            logger.info(`[CART_SERVICE] Removed item ${cartItemId} from cart`);
            return { success: true, message: "Item removed from cart" };
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error removing item ${cartItemId} from cart:`,
                error
            );
            throw new APIError(500, "Failed to remove item from cart");
        }
    }

    /**
     * Update a cart item by its id.
     */
    async updateCartItemById(
        userId: string,
        cartItemId: string,
        updateData: CartItemUpdate
    ): Promise<CartItem> {
        try {
            const data = CartItemUpdateSchema.parse(updateData);
            const cart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!cart) throw new APIError(404, "Cart not found");
            const item = await db.cartItem.findUnique({
                where: { id: cartItemId, cartId: cart.id },
                select: { id: true, product: true },
            });
            if (!item) throw new APIError(404, "Cart item not found");
            if (data.quantity && item.product.stock < data.quantity) {
                throw new APIError(
                    400,
                    `Product is out of stock, only ${item.product.stock} available`
                );
            }
            const updatedItem = await db.cartItem.update({
                where: { id: cartItemId },
                data,
            });
            logger.info(`[CART_SERVICE] Updated item ${cartItemId} in cart`);
            return updatedItem;
        } catch (error: any) {
            if (error instanceof APIError) throw error;
            if (error instanceof z.ZodError) {
                throw new APIError(
                    400,
                    error.errors.map((e: any) => e.message).join(", ")
                );
            }
            logger.error(
                `[CART_SERVICE] Error updating item ${cartItemId} in cart:`,
                error
            );
            throw new APIError(500, "Failed to update cart item");
        }
    }

    /**
     * Get all items for a given cart.
     */
    async getAllCartItems(
        options: {
            page?: number;
            limit?: number;
            includeRelations?: boolean;
        } = {}
    ): Promise<{
        items: (CartItem | CartItemWithRelations)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const { page = 1, limit = 20, includeRelations = false } = options;
            // Count total items
            const total = await db.cartItem.count({});

            // Pagination
            const skip = (page - 1) * limit;

            // Fetch items
            const items = await db.cartItem.findMany({
                skip,
                take: limit,
                include: includeRelations
                    ? {
                          product: true,
                          cart: true,
                          variant: true,
                      }
                    : undefined,
            });

            logger.info(
                `[CART_SERVICE] Retrieved ${items.length} cart items (page ${page}, limit ${limit})`
            );

            return {
                items,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            logger.error(`[CART_SERVICE] Error getting cart items:`, error);
            throw new APIError(500, "Failed to get cart items");
        }
    }

    /**
     * Get a cart item by its id.
     */
    async getCartItemById(
        cartItemId: string,
        includeRelations: boolean = false
    ): Promise<CartItem | CartItemWithRelations | null> {
        try {
            const item = await db.cartItem.findUnique({
                where: { id: cartItemId },
                include: includeRelations
                    ? {
                          product: true,
                          variant: true,
                          cart: true,
                      }
                    : undefined,
            });
            if (!item) {
                logger.info(
                    `[CART_SERVICE] No cart item found with id ${cartItemId}`
                );
                return null;
            }
            logger.info(
                `[CART_SERVICE] Retrieved cart item with id ${cartItemId}`
            );
            return item;
        } catch (error) {
            logger.error(
                `[CART_SERVICE] Error getting cart item by id ${cartItemId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart item");
        }
    }

    /**
     * Get a cart item by its user id.
     */
    async getCartItemByUserId(
        userId: string,
        cartItemId: string,
        includeRelations: boolean = false
    ): Promise<CartItem | CartItemWithRelations | null> {
        try {
            const item = await db.cartItem.findUnique({
                where: { id: cartItemId },
                include: {
                    product: true,
                    variant: true,
                    cart: true,
                },
            });
            if (!item) {
                logger.info(
                    `[CART_SERVICE] No cart item found with id ${cartItemId}`
                );
                return null;
            }
            if (item.cart?.userId !== userId) {
                logger.warn(
                    `[CART_SERVICE] Cart item ${cartItemId} does not belong to user ${userId}`
                );
                throw new APIError(
                    403,
                    "You do not have permission to access this cart item"
                );
            }
            if (!includeRelations) {
                if ("product" in item) delete (item as any).product;
                if ("variant" in item) delete (item as any).variant;
                if ("cart" in item) delete (item as any).cart;
            }
            logger.info(
                `[CART_SERVICE] Retrieved cart item with id ${cartItemId}`
            );
            return item;
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error getting cart item by id ${cartItemId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart item");
        }
    }
    /**
     * Get cart items by their ids.
     */
    async getCartItemsByIds(
        ids: string[],
        includeRelations: boolean = false
    ): Promise<(CartItem | CartItemWithRelations)[]> {
        try {
            const items = await db.cartItem.findMany({
                where: { id: { in: ids } },
                include: includeRelations
                    ? {
                          product: true,
                          cart: true,
                          variant: true,
                      }
                    : undefined,
            });
            logger.info(
                `[CART_SERVICE] Retrieved ${
                    items.length
                } cart items for ids: ${ids.join(", ")}`
            );
            return items;
        } catch (error) {
            logger.error(
                `[CART_SERVICE] Error getting cart items by ids ${ids.join(
                    ", "
                )}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart items");
        }
    }

    async getCartItemsByCartId(
        cartId: string,
        includeRelations: boolean = false
    ): Promise<CartItem | CartItemWithRelations[]> {
        try {
            const cart = await db.carts.findUnique({
                where: { id: cartId },
                select: { id: true },
            });
            if (!cart) {
                logger.info(`[CART_SERVICE] No cart found with id ${cartId}`);
                throw new APIError(404, "Cart not found");
            }
            const items = await db.cartItem.findMany({
                where: { cartId },
                include: includeRelations
                    ? {
                          product: true,
                          variant: true,
                          cart: true,
                      }
                    : undefined,
            });
            logger.info(
                `[CART_SERVICE] Retrieved ${items.length} items for cart id ${cartId}`
            );
            return items;
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error getting cart items by cart id ${cartId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart items");
        }
    }

    /**
     * Get cart items by user id.
     */
    async getCartItemsByUserId(
        userId: string,
        includeRelations: boolean = false
    ): Promise<CartItem | CartItemWithRelations[]> {
        try {
            const cart = await db.carts.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!cart) {
                logger.info(
                    `[CART_SERVICE] No cart found with userId ${userId}`
                );
                throw new APIError(404, "Cart not found");
            }
            const items = await db.cartItem.findMany({
                where: { cartId: cart.id },
                include: includeRelations
                    ? {
                          product: true,
                          variant: true,
                          cart: true,
                      }
                    : undefined,
            });
            if (items.length === 0) {
                logger.info(
                    `[CART_SERVICE] No items found for cart id ${cart.id}`
                );
                return [];
            }
            logger.info(
                `[CART_SERVICE] Retrieved ${items.length} items for cart id ${cart.id}`
            );
            return items;
        } catch (error) {
            if (error instanceof APIError) throw error;
            logger.error(
                `[CART_SERVICE] Error getting cart items by user ID ${userId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve cart items");
        }
    }

    async checkout(userId: string) {
        try {
            logger.info(`[CART_SERVICE] Starting checkout for userId: ${userId}`);
            const userCart = await db.carts.findUnique({
                where: {
                    userId,
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    COD: true,
                                    stock: true,
                                },
                            },
                            variant: {
                                select: {
                                    stock: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!userCart) {
                logger.warn(`[CART_SERVICE] Cart not found for userId: ${userId}`);
                throw new APIError(404, "Cart not found");
            }
            const isAllProductsInStock = userCart.items.every(
                ({ product, variant, quantity }) => {
                    if (product) {
                        return product?.stock >= quantity;
                    }
                    if (variant) {
                        return variant?.stock >= quantity;
                    }
                    return false;
                }
            );
            if (!isAllProductsInStock) {
                logger.warn(`[CART_SERVICE] Not all products are in stock for userId: ${userId}`);
                throw new APIError(400, "Not all products are in stock");
            }
            const isCODavailable = userCart.items.every(({ product }) => {
                return product?.COD;
            });

            if (!isCODavailable) {
                logger.warn(`[CART_SERVICE] COD is not available for some products in userId: ${userId}'s cart`);
                throw new APIError(
                    400,
                    "COD is not available for some products"
                );
            }
            logger.info(`[CART_SERVICE] Checkout successful for userId: ${userId}`);
            return {
                success: true,
                message: "Checkout successful",
            };
        } catch (error) {
            if (error instanceof APIError) {
                logger.error(`[CART_SERVICE] APIError during checkout for userId: ${userId}: ${error.message}`);
                throw error;
            }
            logger.error(`[CART_SERVICE] Failed to retrieve cart items during checkout for userId: ${userId}`, error);
            throw new APIError(500, "Failed to retrieve cart items");
        }
    }
}

export default new CartService();
