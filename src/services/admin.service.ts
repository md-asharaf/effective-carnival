import {
    type Admin,
    type AdminCreate,
    AdminCreateSchema,
} from "@/@types/schema";
import { db } from "@/config/database";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { admins, users } from "@/db/schema";

class AdminService {
    async createAdmin(adminData: AdminCreate): Promise<Admin> {
        try {
            const { email } = AdminCreateSchema.parse(adminData);

            // Check if admin already exists
            const existingAdmin = await db.query.admins.findFirst({
                where: eq(admins.email, email),
                columns: { id: true },
            });
            if (existingAdmin) {
                throw new APIError(
                    409,
                    "Admin with this email already exists. Please use a different email."
                );
            }

            // Check if user exists with the same email
            const existingUser = await db.query.users.findFirst({
                where: eq(users.email, email),
                columns: { id: true },
            });
            if (existingUser) {
                throw new APIError(
                    409,
                    "A user with this email already exists. Please use a different email"
                );
            }

            // Create new admin
            const [admin] = await db
                .insert(admins)
                .values({ email })
                .returning();
            if (!admin) {
                throw new APIError(500, "Failed to create admin");
            }
            logger.info(
                `[ADMIN_SERVICE] Admin created successfully with ID: ${admin.id}`
            );
            return admin as Admin;
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            if (error instanceof z.ZodError) {
                throw new APIError(
                    400,
                    error.errors.map((e) => e.message).join(", ")
                );
            }
            logger.error(`[ADMIN_SERVICE] Error creating admin:`, error);
            throw new APIError(500, "Failed to create admin");
        }
    }

    async getAdminById(adminId: string): Promise<Admin | null> {
        try {
            const admin = await db.query.admins.findFirst({
                where: eq(admins.id, adminId),
            });

            if (!admin) {
                logger.warn(
                    `[ADMIN_SERVICE] Admin not found with ID: ${adminId}`
                );
                return null;
            }

            logger.info(
                `[ADMIN_SERVICE] Admin retrieved successfully with ID: ${adminId}`
            );
            return admin;
        } catch (error) {
            logger.error(
                `[ADMIN_SERVICE] Error getting admin by ID ${adminId}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve admin");
        }
    }

    async getAdminByEmail(email: string): Promise<Admin | null> {
        try {
            const admin = await db.query.admins.findFirst({
                where: eq(admins.email, email),
            });

            if (!admin) {
                logger.warn(
                    `[ADMIN_SERVICE] Admin not found with email: ${email}`
                );
                return null;
            }

            logger.info(
                `[ADMIN_SERVICE] Admin retrieved successfully with email: ${email}`
            );
            return admin;
        } catch (error) {
            logger.error(
                `[ADMIN_SERVICE] Error getting admin by email ${email}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve admin");
        }
    }

    async adminExists(email: string): Promise<boolean> {
        try {
            logger.info(`[ADMIN_SERVICE] Checking if admin exists with email: ${email}`);
            const admin = await db.query.admins.findFirst({
                where: eq(admins.email, email),
                columns: { id: true },
            });
            return !!admin;
        } catch (error) {
            logger.error(
                `[ADMIN_SERVICE] Error checking if admin exists with email ${email}:`,
                error
            );
            throw new APIError(500, "Failed to check admin existence");
        }
    }
}

export default new AdminService();
