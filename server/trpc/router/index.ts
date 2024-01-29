import { NextResponse } from "next/server";
import { publicProcedure, router } from "../trpc";
// import { userRouter } from "./user";

export const appRouter = router({
 getUser: publicProcedure.query(() => {
  console.log("Inside trpc");

  return {
    name: "Vishal"
  }
  
 })
});
// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
