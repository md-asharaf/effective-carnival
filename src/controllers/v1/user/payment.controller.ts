import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import paymentService from "@/services/payment.service";
import { CreateOrderRequest, PaymentVerificationRequest } from "@/@types/payment";

/**
 * Create a new payment order (user authenticated)
 * POST /api/v1/user/payments/create-order
 */
const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData: CreateOrderRequest = req.body;

    if (!orderData) {
        throw new APIError(400, "Order data is required");
    }

    if (!orderData.amount || orderData.amount <= 0) {
        throw new APIError(400, "Valid amount is required");
    }

    if (!orderData.receipt) {
        throw new APIError(400, "Receipt is required");
    }

    try {
        const order = await paymentService.createOrder(orderData);
        res.status(201).json({
            data: { order },
            status: "success",
            message: "Payment order created successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Verify payment (user authenticated)
 * POST /api/v1/user/payments/verify
 */
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
    const verificationData: PaymentVerificationRequest = req.body;

    if (!verificationData) {
        throw new APIError(400, "Verification data is required");
    }

    if (!verificationData.razorpay_order_id) {
        throw new APIError(400, "Razorpay order ID is required");
    }

    if (!verificationData.razorpay_payment_id) {
        throw new APIError(400, "Razorpay payment ID is required");
    }

    if (!verificationData.razorpay_signature) {
        throw new APIError(400, "Razorpay signature is required");
    }

    try {
        const verification = await paymentService.verifyPayment(verificationData);
        res.status(200).json({
            data: { verification },
            status: "success",
            message: "Payment verified successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Handle webhook (user authenticated)
 * POST /api/v1/user/payments/webhook
 */
const handleWebhook = catchAsync(async (req: Request, res: Response) => {
    try {
        const result = await paymentService.handlePaymentStatusUpdate(req);
        res.status(200).json({
            data: { result },
            status: "success",
            message: "Webhook processed successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    createOrder,
    verifyPayment,
    handleWebhook,
}; 