import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "Email cannot be blank",
    }).email("Not a valid email address"),
    password: string({ required_error: "Password cannot be blank" }).min(
      8,
      "Password must be at least 8 characters long"
    ),
  }),
};

export type LoginSchema = TypeOf<typeof loginSchema.body>;
