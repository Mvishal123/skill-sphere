import { getUserRole } from "@/utils/data/current-user-role";
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

export const router = t.router;
export const publicProcedure = t.procedure;

// ADMIN router
export const adminProcedure = t.procedure.use(admin_middleware);
