import { db } from "@/config/database";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import {
    UserCreateSchema,
    UserUpdateSchema,
    type UserCreate,
    type UserUpdate,
    type User,
    type UserWithRelations,
} from "@/@types/schema";
import { users } from "@/db/schema";
import { eq, like, or, and, count, desc, inArray } from "drizzle-orm";

class UserService {
    /**
     * Create a new user
     */
    async createUser(userData: UserCreate): Promise<User> {
        try {
            // Validate input data
            const validatedData = UserCreateSchema.parse(userData);

            // Check if user with email already exists
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, validatedData.email))
                .limit(1);

            if (existingUser.length > 0) {
                throw new APIError(409, "User with this email already exists");
            }

            // Create the user
            const [user] = await db
                .insert(users)
                .values(validatedData)
                .returning();

            logger.info(
                `[USER_SERVICE] User created successfully with ID: ${user.id}`
            );
            return user;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error("[USER_SERVICE] Error creating user:", error);
            throw new APIError(500, "Failed to create user");
        }
    }

    /**
     * Get user by ID
     */
    async getUserById(
        id: string,
        includeRelations: boolean = false
    ): Promise<User | UserWithRelations | null> {
        try {
            // Drizzle recommended approach: Use prepared queries with relations
            const user = await db.query.users.findFirst({
                where: eq(users.id, id),
                with: includeRelations
                    ? {
                          logs: true,
                          memberships: {
                              with: {
                                  store: true,
                              },
                          },
                      }
                    : undefined,
            });

            logger.info(
                `[USER_SERVICE] User retrieved successfully with ID: ${id}`
            );
            return user as UserWithRelations;
        } catch (error) {
            logger.error(
                `[USER_SERVICE] Error getting user by ID ${id}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve user");
        }
    }

    /**
     * Get user by email
     */
    async getUserByEmail(
        email: string,
        includeRelations: boolean = false
    ): Promise<User | UserWithRelations | null> {
        try {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);

            if (user.length === 0) {
                logger.warn(
                    `[USER_SERVICE] User not found with email: ${email}`
                );
                return null;
            }

            if (includeRelations) {
                // Drizzle recommended approach: Use prepared queries with relations
                const userWithRelations = await db.query.users.findFirst({
                    where: eq(users.email, email),
                    with: {
                        logs: true,
                        memberships: {
                            with: {
                                store: true,
                            },
                        },
                    },
                });

                if (!userWithRelations) {
                    logger.warn(
                        `[USER_SERVICE] User not found with email: ${email}`
                    );
                    return null;
                }

                logger.info(
                    `[USER_SERVICE] User retrieved successfully with email: ${email}`
                );
                return userWithRelations as UserWithRelations;
            }

            logger.info(
                `[USER_SERVICE] User retrieved successfully with email: ${email}`
            );
            return user[0];
        } catch (error) {
            logger.error(
                `[USER_SERVICE] Error getting user by email ${email}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve user");
        }
    }

    /**
     * Get all users with pagination and filtering
     */
    async getAllUsers(
        options: {
            page?: number;
            limit?: number;
            search?: string;
            includeRelations?: boolean;
        } = {}
    ): Promise<{
        users: (User | UserWithRelations)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const {
                page = 1,
                limit = 10,
                search,
                includeRelations = false,
            } = options;
            const offset = (page - 1) * limit;

            // Build where clause for search
            const where = search
                ? or(
                      like(users.name, `%${search}%`),
                      like(users.email, `%${search}%`)
                  )
                : undefined;

            // Get total count
            const totalResult = await db
                .select({ count: count(users.id) })
                .from(users)
                .where(where);

            const total = totalResult[0]?.count ?? 0;

            const allUsers = await db.query.users.findMany({
                where,
                offset,
                limit,
                orderBy: [desc(users.createdAt)],
                with: includeRelations
                    ? {
                          logs: true,
                          memberships: true,
                      }
                    : undefined,
            });

            const totalPages = Math.ceil(total / limit);

            logger.info(
                `[USER_SERVICE] Retrieved ${allUsers.length} users (page ${page}/${totalPages})`
            );

            return {
                users: allUsers,
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
            logger.error("[USER_SERVICE] Error getting all users:", error);
            throw new APIError(500, "Failed to retrieve users");
        }
    }

    /**
     * Update user
     */
    async updateUser(id: string, userData: UserUpdate): Promise<User> {
        try {
            // Validate input data
            const validatedData = UserUpdateSchema.parse(userData);

            // Check if user exists
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.id, id))
                .limit(1);

            if (existingUser.length === 0) {
                throw new APIError(404, "User not found");
            }

            // Check if email is being updated and if it already exists
            if (validatedData.email) {
                const emailExists = await db
                    .select()
                    .from(users)
                    .where(
                        and(
                            eq(users.email, validatedData.email!),
                            eq(users.id, id)
                        )
                    )
                    .limit(1);

                if (emailExists.length > 0) {
                    throw new APIError(409, "Email already exists");
                }
            }

            // Update the user
            const [updatedUser] = await db
                .update(users)
                .set({
                    ...validatedData,
                    updatedAt: new Date(),
                })
                .where(eq(users.id, id))
                .returning();

            logger.info(
                `[USER_SERVICE] User updated successfully with ID: ${id}`
            );
            return updatedUser;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(`[USER_SERVICE] Error updating user ${id}:`, error);
            throw new APIError(500, "Failed to update user");
        }
    }

    /**
     * Delete user (hard delete)
     */
    async deleteUser(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if user exists
            const existingUser = await db.query.users.findFirst({
                where: eq(users.id, id),
                with: {
                    logs: true,
                    memberships: true,
                },
            });

            if (!existingUser) {
                throw new APIError(404, "User not found");
            }

            if (
                (Array.isArray(existingUser.logs) &&
                    existingUser.logs.length > 0) ||
                (Array.isArray(existingUser.memberships) &&
                    existingUser.memberships.length > 0)
            ) {
                throw new APIError(
                    400,
                    "Cannot delete user. User has associated logs or memberships. Please remove these associations first."
                );
            }

            // Delete the user
            await db.delete(users).where(eq(users.id, id));

            logger.info(
                `[USER_SERVICE] User deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "User deleted successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(`[USER_SERVICE] Error deleting user ${id}:`, error);
            throw new APIError(500, "Failed to delete user");
        }
    }

    /**
     * Soft delete user
     */
    async softDeleteUser(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if user exists
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.id, id))
                .limit(1);

            if (existingUser.length === 0) {
                throw new APIError(404, "User not found");
            }

            // Soft delete the user
            await db
                .update(users)
                .set({
                    isActive: false,
                    deletedAt: new Date(),
                    updatedAt: new Date(),
                })
                .where(eq(users.id, id));

            logger.info(
                `[USER_SERVICE] User soft deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "User soft deleted successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[USER_SERVICE] Error soft deleting user ${id}:`,
                error
            );
            throw new APIError(500, "Failed to soft delete user");
        }
    }

    /**
     * Check if user exists by email
     */
    async userExists(email: string): Promise<boolean> {
        try {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);

            return user.length > 0;
        } catch (error) {
            logger.error(
                `[USER_SERVICE] Error checking if user exists with email ${email}:`,
                error
            );
            throw new APIError(500, "Failed to check user existence");
        }
    }

    /**
     * Get users by IDs
     */
    async getUsersByIds(
        ids: string[],
        includeRelations: boolean = false
    ): Promise<User[]> {
        try {
            const allUsers = await db.query.users.findMany({
                where: inArray(users.id, ids),
                with: includeRelations
                    ? {
                          logs: true,
                          memberships: true,
                      }
                    : undefined,
            });
            logger.info(
                `[USER_SERVICE] Retrieved ${allUsers.length} users by IDs`
            );
            return allUsers;
        } catch (error) {
            logger.error("[USER_SERVICE] Error getting users by IDs:", error);
            throw new APIError(500, "Failed to retrieve users");
        }
    }
}

export default new UserService();
