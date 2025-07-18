import { Router } from "express";
import { authControllers } from "@/controllers/v1";

const router = Router();

// User authentication routes
router.post("/register", authControllers.user.initiateRegister);
router.post("/register/verify", authControllers.user.verifyRegistration);
router.post("/login", authControllers.user.login);
router.post("/login/verify", authControllers.user.verifyLogin);
router.post("/refresh", authControllers.user.refreshTokens);
router.post("/logout", authControllers.user.logout);

// Admin authentication routes
router.post("/admin/login", authControllers.admin.initiateLogin);
router.post("/admin/login/verify", authControllers.admin.verifyLogin);
router.post("/admin/resend-otp", authControllers.admin.resendOtpToMail);
router.post("/admin/refresh", authControllers.admin.refreshTokens);

export default router; 