import { courseTitleSchema } from "@/schemas";
import { adminProcedure, router } from "../trpc";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const courseRouter = router({
  createCourse: adminProcedure
    .input(courseTitleSchema)
    .mutation(async ({ input }) => {
      const validatedFields = courseTitleSchema.safeParse(input);

      if (!validatedFields.success) {
        throw new TRPCError({ code: "PARSE_ERROR", message: "Invalid entry" });
      }

      const { title } = input;
      const session = await getServerAuthSession();
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Session expired",
        });
      }

      const course = await db.course.create({
        data: {
          title,
          userId: session.userId,
        },
      });

      return {
        success: "Course created successfully",
        courseId: course.id
      };
    }),
});
