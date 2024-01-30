import { router } from "../trpc";
import { courseRouter } from "./course";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  course: courseRouter
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
