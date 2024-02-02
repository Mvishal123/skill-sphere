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
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        if (!email || !password) return null;

        const user = await getUserByEmail(email as string);

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          password as string,
          user.password
        );

        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
