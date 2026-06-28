import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import { initSocket } from "./socket.js";

const PORT = process.env.PORT || 5000;
const app = express();


app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://azentrix-fullstack-task2-eta.vercel.app"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);


app.get("/", (req, res) => {
    res.json({ message: "api is running" });
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
    connectDB();
});