
import { z } from "zod"

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required."),
    email: z
      .string()
      .email("Invalid email format.")
      .refine(
        (val) =>
          !val.includes("mailinator") &&
          !val.includes("10minutemail") &&
          !val.includes("guerrillamail"),
        {
          message: "Disposable emails are not allowed.",
        }
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[a-z]/, "Must contain a lowercase letter.")
      .regex(/\d/, "Must contain a number.")
      .regex(/[\W_]/, "Must contain a special character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })