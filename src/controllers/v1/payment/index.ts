import catchAsync from "@/handlers/async.handler";
import razorpayService from "@/services/payment.service";
import { Request, Response } from "express";

/**
 * Create a new payment order
 */
const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { amount, currency, receipt, notes } = req.body;

    const orderData = {
        amount,
        currency: currency || "INR",
        receipt,
        notes: notes || {},
    };

    const order = await razorpayService.createOrder(orderData);

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
    });
});

/**
 * Verify payment signature
 */
const verifyPaymentSignature = catchAsync(async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const verificationData = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    };

    const verificationResult = await razorpayService.verifyPayment(verificationData);

    res.json({
        success: true,
        message: "Payment verified successfully",
        data: verificationResult,
    });
});

/**
 * Handle Razorpay webhook
 */
const razorpayWebhook = catchAsync(async (req: Request, res: Response) => {
    try {
        const result = await razorpayService.handlePaymentStatusUpdate({
            headers: req.headers,
            body: req.body,
        });

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

export {
    createOrder,
    verifyPaymentSignature,
    razorpayWebhook,
}; 