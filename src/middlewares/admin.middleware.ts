import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { APIError } from "@/utils/APIError";
import catchAsync from "@/handlers/async.handler";
import envVars from "@/config/envVars";
import adminService from "@/services/admin.service";
import { verifyToken } from "@/services/tokens.service";

export const authenticateAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new APIError(   
                401,
                "Authentication required. Please provide a valid token."
            );
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = verifyToken(
                token,
                envVars.JWT_SECRET
            );
            if (!decoded || !decoded.id || !decoded.jti) {
                throw new APIError(401, "Invalid token payload.");
            }

            const admin = await adminService.getAdminById(decoded.id);
            if (!admin) {
                throw new APIError(
                    401,
                    "Unauthorized. Admin associated with this token not found."
                );
            }

            req.admin = admin;

            next();
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            if (error instanceof jwt.TokenExpiredError) {
                throw new APIError(
                    401,
                    "Token has expired. Please log in again."
                );
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new APIError(401, "Invalid token. Please log in again.");
            }
            console.error("Admin Authentication error:", error);
            throw new APIError(
                500,
                "An unexpected error occurred during admin authentication."
            );
        }
    }
);
