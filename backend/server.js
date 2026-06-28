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

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://azentrix-fullstack-task2-eta.vercel.app",
    ...(process.env.FRONTEND_URLS
        ? process.env.FRONTEND_URLS.split(",").map((origin) => origin.trim())
        : [])
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);


app.get("/", (req, res) => {
    res.json({ message: "api is running" });
});

const server = http.createServer(app);
initSocket(server);

connectDB().then(() => {
    server.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);
    });
});
