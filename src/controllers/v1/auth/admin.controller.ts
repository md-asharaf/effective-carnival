import {
    AdminLoginInterface,
    AdminLoginSchema,
    RefreshTokenInterface,
    RefreshTokenSchema,
    VerifyLoginInterface,
    VerifyLoginSchema,
} from "@/@types/interface";
import envVars from "@/config/envVars";
import catchAsync from "@/handlers/async.handler";
import { sendOtp, validateOtp } from "@/services/otp.service";
import { generateTokens, verifyToken } from "@/services/tokens.service";
import adminService from "@/services/admin.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";
import crypto from "crypto";

const initiateLogin = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body as AdminLoginInterface;
    if (!email) {
        throw new APIError(400, "Missing required fields: email is required");
    }
    try {
        const { email } = AdminLoginSchema.parse(req.body);
        // Check if admin exists
        const adminExists = await adminService.adminExists(email);
        if (!adminExists) {
            throw new APIError(404, "Admin with this email does not exist");
        }
        // send OTP
        const { message, status, otp } = await sendOtp(email);
        if (status === "error" || !otp) {
            throw new APIError(500, message);
        }
        // Send response
        res.status(201).json({
            data: {
                otp,
            },
            status: "success",
            message:
                "Login initiated successfully. Please check your email for the OTP.",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            console.log("Zod validation error:", error.errors);
            throw new APIError(
                400,
                error.errors.map((e) => "asharaf").join(", ")
            );
        }
        console.error("Error during login:", error);
        throw new APIError(500, error.message);
    }
});

const verifyLogin = catchAsync(async (req: Request, res: Response) => {
    const { email, code } = req.body as VerifyLoginInterface;
    if (!email || !code) {
        throw new APIError(
            400,
            "Missing required fields: email and code are required"
        );
    }
    try {
        const { email, code } = VerifyLoginSchema.parse(req.body);
        // Check if admin exists
        const admin = await adminService.getAdminByEmail(email);
        if (!admin) {
            throw new APIError(404, "Admin with this email does not exist");
        }
        // Validate OTP
        const validateOtpData = await validateOtp(email, code);
        if (validateOtpData.status === "error") {
            throw new APIError(400, validateOtpData.message);
        }
        // Generate JWT tokens
        const jti = crypto.randomUUID();
        const jwtSecret = envVars.JWT_SECRET || "your_jwt_secret";
        const { accessToken, refreshToken } = generateTokens(
            admin.id,
            jti,
            jwtSecret
        );
        // Send response
        res.status(200).json({
            data: {
                admin,
                accessToken,
                refreshToken,
            },
            status: "success",
            message: "Login verified successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            console.log("Zod validation error:", error.errors);
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        console.error("Error verifying login:", error);
        throw new APIError(500, error.message);
    }
});

const resendOtpToMail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body as AdminLoginInterface;
    if (!email) {
        throw new APIError(400, "Missing required fields: email is required");
    }
    try {
        const { email } = AdminLoginSchema.parse(req.body);
        // Check if admin exists
        const adminExists = await adminService.adminExists(email);
        if (!adminExists) {
            throw new APIError(404, "Admin does not exist, cannot resend OTP");
        }
        // Send OTP
        const sendOtpData = await sendOtp(email);
        if (sendOtpData.status === "error") {
            throw new APIError(500, sendOtpData.message);
        }

        // Send response
        res.status(200).json({
            data: {
                otp: sendOtpData.otp,
            },
            status: "success",
            message: "OTP sent successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            console.log("Zod validation error:", error.errors);
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        console.error("Error sending OTP:", error);
        throw new APIError(500, error.message);
    }
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.body as RefreshTokenInterface;
    if (!token) {
        throw new APIError(400, "Missing required fields: token is required");
    }
    try {
        const { token } = RefreshTokenSchema.parse(req.body);
        // Verify the refresh token
        const secretKey = envVars.JWT_SECRET;
        const decodedToken = verifyToken(token, secretKey);
        if (!decodedToken) {
            throw new APIError(401, "Invalid or expired refresh token");
        }
        // Generate new access and refresh tokens
        const jti = crypto.randomUUID();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            decodedToken.id,
            jti,
            secretKey
        );
        // Send response
        res.status(200).json({
            data: {
                accessToken,
                refreshToken: newRefreshToken,
            },
            status: "success",
            message: "Tokens refreshed successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            console.log("Zod validation error:", error.errors);
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        console.error("Error refreshing tokens:", error);
        throw new APIError(500, error.message);
    }
});

export default {
    initiateLogin,
    verifyLogin,
    resendOtpToMail,
    refreshTokens,
};
