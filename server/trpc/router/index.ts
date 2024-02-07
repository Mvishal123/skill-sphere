import { router } from "../trpc";
import { chapterRouter } from "./chapter";
import { courseRouter } from "./course";
import { purchaseRouter } from "./purchase";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  course: courseRouter,
  chapter: chapterRouter,
  purchase: purchaseRouter,
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
