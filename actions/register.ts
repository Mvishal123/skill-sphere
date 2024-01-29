"use server";

import { db } from "@/db";

import { registerSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/data/getUserByEmail";

import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: "Invalid credentials",
    };

  const { username, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ hashedPassword });

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: "Signed up successfully",
  };
};
