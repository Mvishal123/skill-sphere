import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  test: publicProcedure.query(async () => {
    return [1, 2, 3, 4, 5];
  }),
});
