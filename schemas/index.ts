import { z } from "zod";

// User
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

//Course Schema
export const courseTitleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" }),
});
