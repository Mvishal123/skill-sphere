import { getUserRole } from "@/utils/data/current-user-role";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { UserRole } from "@prisma/client";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();

// middlewares
const middleware = t.middleware;

const admin_middleware = middleware(async (opts) => {
  const userRole = await getUserRole();
  if (userRole === UserRole.USER) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Admin privelages not available",
    });
  }
  return opts.next();
});

const user_middleware = middleware(async (opts) => {
  const session = await getServerAuthSession();
  if (!session?.email || !session.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in to access" });
  }

  return opts.next({
    ctx: {
      userId: session.userId,
      email: session.email,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;

// ADMIN router
export const adminProcedure = t.procedure.use(admin_middleware);

// USER procedure
export const userProcedure = t.procedure.use(user_middleware);
