import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `MongoDB is connected ⚡:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Unable to connect DB", error);
    process.exit(1);
  }
};

export default connectDB;
