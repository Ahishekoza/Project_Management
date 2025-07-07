import mongoose from "mongoose";

const MONGODB_URL = String(process.env.MONGO_URL);

if (!MONGODB_URL) {
  throw new Error("Please define MONGO_URL in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  try {
    if (!cached.conn) {
      cached.promise = await mongoose.connect(MONGODB_URL, {
        bufferCommands: false,
      });
    }
    cached.conn = cached.promise;
    return cached.conn;
  } catch (error) {
    console.log(`Error connecting DB ${error.message}`)
  }
};
