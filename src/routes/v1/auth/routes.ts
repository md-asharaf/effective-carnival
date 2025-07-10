//import { v1Controllers } from "@/controllers";
import { authControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router()
router.post("/register",authControllers.user.initiateRegister)


export default router;