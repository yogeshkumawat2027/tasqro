import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
     origin: [
      "http://localhost:5173",
      "https://azentrix-fullstack-task2-eta.vercel.app",
    ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-board", (boardId) => {
      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    socket.on("leave-board", (boardId) => {
      socket.leave(boardId);
      console.log(`Socket ${socket.id} left board ${boardId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};