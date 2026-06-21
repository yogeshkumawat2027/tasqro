import jwt from "jsonwebtoken";
import User from "../models/User";
import { decode } from "node:punycode";

const auth = async (req , res , next)=>{
    try{
         
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ success : false , message : "please login first"});
        }

        const decoded = jwt.verify( token , process.env.JWT_SECRET);

        const user = await User.findById(decode.id).select("-password");

        if(!user)  return res.status(401).json({ success: false, message: "User not found" });

         req.user = user;

         next();
      
    }catch(err){
        return res.status(401).json({success  : false , message : "Invalid token"});
    }
}

export default auth;