import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: "Inavlid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Inavlid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters" }),
});
