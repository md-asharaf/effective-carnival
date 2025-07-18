import { userControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.post("/create-order", userControllers.payment.createOrder);
router.post("/verify", userControllers.payment.verifyPayment);
router.post("/webhook", userControllers.payment.handleWebhook);

export default router; 