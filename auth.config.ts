import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas";
import { db } from "./db";
import { getUserByEmail } from "./utils/data/getUserByEmail";

export default {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        // const validatedFields = loginSchema.safeParse(credentials);
        // if (!validatedFields) return null;

        // const { email, password } = credentials;

        // if (!email || !password) return null;

        // const existingUser = await getUserByEmail(email as string);

        // if(!existingUser) return null;

        // passowrd match
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
