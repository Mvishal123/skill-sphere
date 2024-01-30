import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { ADMIN_ROUTES } from "./routes";
import { redirect } from "next/dist/server/api-utils";
export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
