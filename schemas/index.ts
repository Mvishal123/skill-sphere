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

export const courseSchema = z.object({
  title: z.optional(
    z.string().min(2, { message: "Title should not be empty" })
  ),

  description: z.optional(
    z.string().min(1, { message: "Description should not be empty" })
  ),
  image: z.optional(z.string()),
  cost: z.number().min(1, { message: "Course can't be free" }).optional(),
  category: z.optional(z.string()),
});
