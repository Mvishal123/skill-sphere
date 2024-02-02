import { z } from "zod";
import { adminProcedure, router } from "../trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";

export const chapterRouter = router({
  createChapter: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const course = await db.chapter.create({
          data: {
            title: input.title,
            courseId: input.courseId,
          },
        });

        return course;
      } catch (error) {
        console.log("[CREATE COURSE TRPC]", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
