import {
    registerInterface,
    verifyRegistrationInterface,
} from "@/@types/interface";
import { redis } from "@/config/database";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";

const initiateRegister = catchAsync(async (req: Request, res: Response) => {
    const { name, email } = req.body as registerInterface;
    if (!email || !name) {
        throw new APIError(
            400,
            "Missing required fields: name and email are required"
        );
    }
    try {
        await redis.setValue(
            `register:${email}`,
            JSON.stringify({ name }),
            60 * 60
        );
        res.status(200).json({
            status: "success",
            message:
                "Registration initiated successfully. Please check your email for the verification code.",
        });
        return;
    } catch (error) {
        if (error instanceof APIError) throw error;
        console.error("Error initiating registration:", error);
        throw new APIError(500, "Internal Server Error");
    }
});

const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
    const { email, code } = req.body as verifyRegistrationInterface;
    if (!email || !code) {
        throw new APIError(
            400,
            "Missing required fields: email and code are required"
        );
    }
    try {
    } catch (error) {
        console.error("Error verifying registration:", error);
        throw new APIError(500, "Internal Server Error");
    }
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        throw new APIError(400, "Missing required fields: email is required");
    }
});

const verifyLogin = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        throw new APIError(400, "Missing required fields: email is required");
    }
});

export default { initiateRegister, verifyRegistration, login, verifyLogin };
