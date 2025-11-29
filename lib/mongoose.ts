import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // To suppress deprecation warning

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "afg-crawler-db",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
