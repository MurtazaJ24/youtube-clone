import express from "express";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middlewares/requireUser";
import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = express.Router();

router.get("/me", requireUser, (req, res) => res.send(res.locals.user));

router.post(
  "/register",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
