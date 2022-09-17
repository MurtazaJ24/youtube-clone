import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/omit";
import { findUserByEmail } from "../user/user.service";
import { LoginSchema } from "./auth.schema";
import { signJWT } from "./auth.utils";

export async function loginHandler(
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !user.checkPassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password.");
  }

  const payload = omit(user.toJSON(), ["password", "__v"]);
  const jwt = signJWT(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}
