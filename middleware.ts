import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
