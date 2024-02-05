import { z } from "zod";
import { adminProcedure, router } from "../trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { chapterSchema } from "@/schemas";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";

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

  chapterReorder: adminProcedure
    .input(
      z.object({
        list: z.array(
          z.object({
            chapterId: z.string(),
            position: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { list } = input;

      try {
        for (let item of list) {
          await db.chapter.update({
            where: {
              id: item.chapterId,
            },
            data: {
              position: item.position,
            },
          });
        }

        return "Reordered successfully";
      } catch (error) {
        throw new TRPCError({
          code: "NOT_IMPLEMENTED",
          message: "Reorder unsuccessfull",
        });
      }
    }),

  deleteChapter: adminProcedure
    .input(
      z.object({
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { chapterId } = input;

      try {
        const chapter = await db.chapter.delete({
          where: {
            id: chapterId,
          },
        });

        return { courseId: chapter.courseId };
      } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }
    }),

  chapterUpdate: adminProcedure
    .input(
      z.object({
        values: chapterSchema,
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const validatedFields = chapterSchema.safeParse(input.values);
      if (!validatedFields.success) {
        throw new TRPCError({ code: "PARSE_ERROR", message: "Invalid input" });
      }

      const session = await getServerAuthSession();
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Admin privelages not available",
        });
      }

      try {
        await db.chapter.update({
          data: {
            ...input.values,
          },
          where: {
            id: input.chapterId,
          },
        });
      } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }
    }),

  publishChapter: adminProcedure
    .input(
      z.object({
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getServerAuthSession();

      if (!session?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthourized action",
        });
      }

      const { chapterId } = input;

      try {
        await db.chapter.update({
          where: {
            id: chapterId,
          },
          data: {
            isPublished: true,
          },
        });
        return "Chapter has been published successfully";

      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something unexpected happened while updating the course",
        });
      }
    }),

  unpublishChapter: adminProcedure
    .input(
      z.object({
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getServerAuthSession();

      if (!session?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthourized action",
        });
      }

      const { chapterId } = input;

      try {
        await db.chapter.update({
          where: {
            id: chapterId,
          },
          data: {
            isPublished: false,
          },
        });

        return "Chapter has been unpublished successfully";
      } catch (error) {
        throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
          message: "Something unexpected happened while updating the course",
        });
      }
    }),
});
