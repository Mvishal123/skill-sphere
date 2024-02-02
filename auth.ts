import authConfig from "@/auth.config";
import { db } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({}) {
      return true;
    },
    async session({ session, token }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.userId = token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await db.user.findFirst({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) {
        return token;
      }

      token.id = token.sub;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: "123123",
  ...authConfig,
});
