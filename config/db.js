import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set. Add it to the project's .env file.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`, {
      cause: error,
    });
  }
};

export default connectDB
