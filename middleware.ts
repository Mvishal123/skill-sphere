import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PUBLIC_ROUES } from "./routes";
export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // const nextUrl = req.nextUrl;
  // const pathname = nextUrl.pathname;
  
  // const isPublicRoute = PUBLIC_ROUES.includes(pathname);
  // console.log({isPublicRoute});
  
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
