import { Router } from "express";
const router = Router();

import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { create, findAll, topNews } from "../controllers/news.controller.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);

export default router;
