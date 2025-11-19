import mongoose from "mongoose";


const connectdb = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/blogsAI`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectdb;