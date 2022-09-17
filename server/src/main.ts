import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { CORS_ORIGIN } from "./constants";
import { connectToDB, disconnectFromDB } from "./utils/database";
import logger from "./utils/logger";
import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import videoRoutes from "./modules/videos/video.routes";
import deserializeUser from "./middlewares/deserializeUser";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

const server = app.listen(PORT, async () => {
  await connectToDB();
  return logger.info("Server started");
});

const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    server.close();

    await disconnectFromDB();

    logger.info("Bye bye....");

    process.exit(0);
  });
};

for (const signal of signals) {
  gracefulShutdown(signal);
}
