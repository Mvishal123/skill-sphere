import { loginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./utils/data/getUserByEmail";

import bcrypt from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields) return null;

        const { email, password } = credentials;

        if (!email || !password) return null;

        const existingUser = await getUserByEmail(email as string);

        if (!existingUser) return null;

        const passwordMatch = await bcrypt.compare(
          password as string,
          existingUser.password
        );

        if (passwordMatch) {
          return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
