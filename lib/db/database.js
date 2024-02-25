import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(
            process.env.MONGODB_URI,
            {
                dbName: process.env.MONGODB_DATABASE,
            }
        );

        isConnected = true;
        console.log("(database.js) MongoDB connected");
    } catch (error) {
        console.log('cannot connect to db : ', error.message);
    }
}