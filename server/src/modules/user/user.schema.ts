import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "Username cannot be blank",
    }),
    email: string({
      required_error: "Email cannot be blank",
    }).email("Not a valid email address"),
    password: string({
      required_error: "Password cannot be blank",
    }).min(8, "Password must be at least 8 characters long"),
    confirmPassword: string({
      required_error: "Confirm password cannot be blank",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type RegisterUserSchema = TypeOf<typeof registerUserSchema.body>;
