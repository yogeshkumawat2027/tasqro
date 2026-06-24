import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

dotenv.config();
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);


app.get("/", (req,res)=>{
    res.json({ message : "api is running"});
});
 
app.listen(PORT, ()=>{
    console.log(`api is running on port ${PORT}`);
    connectDB();
});