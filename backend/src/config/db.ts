import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const connectionString = process.env.MONGO_CONNECTION_STRING;
        if(connectionString) {
            const connectionInstance = await mongoose.connect(connectionString);  
            console.log(`\n Database connected: \n DB host: ${connectionInstance.connection.host}`);     
        } else {
            throw new Error("MongoDB connection string is missing")
        }
    } catch(err) {
        console.log(`\nMongoDB connection failed \n`, {details: err})
    }
}