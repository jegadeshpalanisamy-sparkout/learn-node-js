import { Router } from "express";
import { getHome } from "../controllers/home.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

router.get('/welcome', authMiddleware, adminMiddleware, getHome);

export default router;
