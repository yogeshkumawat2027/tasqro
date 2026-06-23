import Board from "../models/Board.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title){
    return res.status(400).json({success: false,  message: "Board title is required"});
  }

  const board = await Board.create({
    title,
    description,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json({success: true,message: "Board created successfully",board });
    
});

export const getMyBoards = asyncHandler( async (req, res) =>{

  const boards = await Board.find({
    members: req.user._id,
  }).populate("createdBy", "name email role");

  res.status(200).json({success: true,boards});
    
});

export const getSingleBoard = asyncHandler(async (req, res) => {

  const board = await Board.findById(req.params.id);

  if (!board)  return res.status(404).json({success: false,message: "Board not found",});

   await  board.populate("createdBy", "name email role")
         .populate("members", "name email role");

  

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


  if(title !== undefined && title.trim() === "") 
    return res.status(400).json({success: false,message: "Title cannot be empty",});


  const board = await Board.findById(req.params.id);

  if(!board) return res.status(404).json({success: false,message: "Board not found",}); 

  if(board.createdBy.toString() !== req.user._id.toString() &&req.user.role !== "admin"){  //user or admin can update
    
    return res.status(403).json({
      success: false,
      message: "Only board creator or admin can update board",
    });
  }

  board.title = title ?? board.title;
  board.description = description ?? board.description;

  await board.save();

  res.status(200).json({
    success: true,
    message: "Board updated successfully",
    board,
  });
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if(!board)  return res.status(404).json({success: false,message: "Board not found",});
   
  if(board.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"){
  
    return res.status(403).json(
        {success: false,
         message: "Only board creator or admin can delete board" 
        }
    ); 
  }

  const deleted = await board.deleteOne();

  res.status(200).json({
    success: true,
    message: "Board deleted successfully", deleted
  });
});