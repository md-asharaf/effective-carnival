import { adminControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.post("/webhook", adminControllers.payment.handleWebhook);

export default router; 