import mongoose from "mongoose";


export const dbConnect = async () => {
    try {
        const conn =  mongoose.connect(process.env.MONGO_URI);
        if(conn) console.log("DB Connected")
    } catch (error) {
        console.error(error);
    }
}