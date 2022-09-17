import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/youtube-clone";

export async function connectToDB() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected to database");
  } catch (error) {
    logger.error("Error connecting to database", error);
    process.exit(1);
  }
}

export async function disconnectFromDB() {
  await mongoose.connection.close();
  logger.info("Disconnected from database");
  return;
}
