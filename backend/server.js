import express from "express";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();


app.get("/" , (req,res)=>{
    res.json({ message : "api is running"});
});
 
app.listen(PORT, ()=>{
    console.log(`api is running on port ${PORT}`);
    connectDB();
});