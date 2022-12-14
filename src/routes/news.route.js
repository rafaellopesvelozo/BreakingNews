import { Router } from "express";
const router = Router();

import { authMiddleware } from "../middlewares/auth.middlewares.js";
import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
} from "../controllers/news.controller.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, likeNews);

export default router;
