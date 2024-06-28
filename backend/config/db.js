import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://brianwahungu123:brian.301@cluster0.uhdp6w3.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}