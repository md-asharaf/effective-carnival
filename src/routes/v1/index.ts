import { Router } from "express";
import authRoutes from "./auth";
import publicRoutes from "./public";
import userRoutes from "./user";
import adminRoutes from "./admin";
import { authenticateUser } from "@/middlewares/auth.middleware";
import { authenticateAdmin } from "@/middlewares/admin.middleware";

const v1Router = Router();

// Admin authenticated routes (require admin authentication)
v1Router.use("/admin", authenticateAdmin, adminRoutes);

// Auth routes (for login/register - typically public)
v1Router.use("/auth", authRoutes);
// User authenticated routes (require user authentication)
v1Router.use("/user", authenticateUser, userRoutes);
// Public routes (accessible without authentication)
v1Router.use("/", publicRoutes);

export default v1Router;