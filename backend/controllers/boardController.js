import Board from "../models/Board.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import { getIO } from "../socket.js";

export const createBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Board title is required" });
  }

  const board = await Board.create({
    title,
    description,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json({ success: true, message: "Board created successfully", board });

});

export const getMyBoards = asyncHandler(async (req, res) => {

  const boards = await Board.find({
    members: req.user._id,
  }).populate("createdBy", "name email role");

  res.status(200).json({ success: true, boards });

});

export const getSingleBoard = asyncHandler(async (req, res) => {

  const board = await Board.findById(req.params.id)
    .populate("createdBy", "name email role")
    .populate("members", "name email role");


  if (!board) return res.status(404).json({ success: false, message: "Board not found", });

  if (!board.members.some((m) => m._id.toString() === req.user._id.toString())) {
    return res.status(403).json({
      success: false,
      message: "You are not a member of this board",
    });
  }

  res.status(200).json({
    success: true,
    board,
  });
});

export const updateBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (title !== undefined && title.trim() === "")
    return res.status(400).json({ success: false, message: "Title cannot be empty", });

  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ success: false, message: "Board not found", });

  if (board.createdBy.toString() !== req.user._id.toString()) {  //board creator can update
    return res.status(403).json({
      success: false,
      message: "Only board creator can update board",
    });
  }

  board.title = title ?? board.title;
  board.description = description ?? board.description;

  await board.save();

  });

export const deleteBoard = asyncHandler(async (req, res) => {

  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ success: false, message: "Board not found", });

  if (board.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json(
      {
        success: false,
        message: "Only board createor can delete board"
      }
    );
  }

  const boardId = board._id.toString();

  const deleted = await board.deleteOne();

  const io = getIO();
  io.to(boardId).emit("board-deleted", boardId);

  res.status(200).json({
    success: true,
    message: "Board deleted successfully", deleted
  });
});

export const addBoardMember = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ success: false, message: "Board not found" });

  if (board.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Only board creator can add members" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const alreadyMember = board.members.some(
    (memberId) => memberId.toString() === user._id.toString()
  );

  if (alreadyMember) return res.status(400).json({ success: false, message: "User already member" });

  board.members.push(user._id);
  await board.save();

  const io = getIO();
  io.to(board._id.toString()).emit("member-added", {
    boardId: board._id,
    member: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  res.status(200).json({ success: true, message: "Member added successfully", board });
});

export const removeBoardMember = asyncHandler(async (req, res) => {

  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ success: false, message: "Board not found" });

  if (board.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "only board creator can remove members" });
  }

  if (req.params.userId === board.createdBy.toString()) {
    return res.status(400).json({ success: false, message: "Creator cannot be removed" });
  }

  board.members = board.members.filter(
    (memberId) => memberId.toString() !== req.params.userId
  );

  const removedUserId = req.params.userId;

  await board.save();

  const io = getIO();
  io.to(board._id.toString()).emit("member-removed", {
    boardId: board._id,
    userId: removedUserId,
  });


  res.status(200).json({ success: true, message: "member removed successfully", board });
});


export const getBoardMembers = asyncHandler(async (req, res) => {

  const board = await Board.findById(req.params.id).populate("members", "name email role");

  if (!board) return res.status(404).json({ success: false, message: "board not found" });

  const isMember = board.members.some(
    (m) => m._id.toString() === req.user._id.toString()
  );

  if (!isMember) {
    return res.status(403).json({ success: false, message: "You are not a member of this board" });
  }

  res.status(200).json({ success: true, members: board.members });
});