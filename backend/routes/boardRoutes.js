import express from "express";
import {
  createBoard,
  getMyBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
  addBoardMember,
  removeBoardMember,
  getBoardMembers,
} from "../controllers/boardController.js";

import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createBoard);
router.get("/", auth, getMyBoards);
router.get("/:id", auth, getSingleBoard);
router.put("/:id", auth, updateBoard);
router.delete("/:id", auth, deleteBoard);

router.post("/:id/members", auth, addBoardMember);
router.delete("/:id/members/:userId", auth, removeBoardMember);
router.get("/:id/members", auth, getBoardMembers);

export default router;