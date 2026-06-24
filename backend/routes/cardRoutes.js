import express from "express";

import auth from "../middlewares/authMiddleware.js";
import { createCard, deleteCard, getBoardCards, getSingleCard, moveCard, updateCard } from "../controllers/cardController.js";

const router = express.Router();


router.post("/:boardId/cards", auth, createCard);
router.get("/:boardId/cards", auth, getBoardCards);

router.get("/:cardId", auth, getSingleCard);
router.put("/:cardId", auth, updateCard);
router.delete("/:cardId", auth, deleteCard);
router.patch("/:cardId/move", auth, moveCard);

export default router;