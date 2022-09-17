import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserSchema } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserSchema>,
  res: Response
) {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });

    return res
      .status(StatusCodes.CREATED)
      .send("User created successfully. You can now log in!");
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(StatusCodes.CONFLICT)
        .send("User already exists, try logging in.");

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
