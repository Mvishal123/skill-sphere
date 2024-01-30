import { router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
