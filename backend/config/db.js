import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not configured");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;
