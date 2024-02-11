import "server-only";

import { appRouter } from "@/server/trpc/router";
import { createCallerFactory } from "@/server/trpc/trpc";

const createCaller = createCallerFactory(appRouter);

// 2. create a caller using your `Context`
export const serverTrpc = createCaller({
  session: {},
});
