import { courseSchema, courseTitleSchema } from "@/schemas";
import { adminProcedure, publicProcedure, router } from "../trpc";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const courseRouter = router({
  // create course
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
        courseId: course.id,
      };
    }),

  getCourse: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const course = await db.course.findFirst({
        where: {
          id: input.courseId,
        },
      });

      if (!course) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }

      return course;
    }),

  // delete a course
  deleteCourse: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getServerAuthSession();
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "session expired",
        });
      }

      try {
        await db.course.delete({
          where: {
            id: input.courseId,
            userId: session.userId,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong",
        });
      }
    }),

  // Update course details
  updateCourse: adminProcedure
    .input(
      z.object({
        values: courseSchema,
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const validatedFields = courseSchema.safeParse(input.values);
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
        await db.course.update({
          data: {
            ...input.values,
          },
          where: {
            id: input.courseId,
          },
        });
      } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
      }
    }),

  getCategories: adminProcedure.query(async () => {
    const categories = await db.coursecategory.findMany({});

    if (!categories) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something unexpected happened",
      });
    }

    return categories;
  }),

  publishCourse: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
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

      const { courseId } = input;

      try {
        await db.course.update({
          where: {
            id: courseId,
            userId: session.userId,
          },
          data: {
            isPublished: true,
          },
        });
        return "Course has been published successfully";
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something unexpected happened while updating the course",
        });
      }
    }),
  unpublishCourse: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
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

      const { courseId } = input;

      try {
        await db.course.update({
          where: {
            id: courseId,
            userId: session.userId,
          },
          data: {
            isPublished: false,
          },
        });
        return "Course has been unpublished successfully";
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something unexpected happened while updating the course",
        });
      }
    }),

  // getTrendingCourses: publicProcedure.query(async () => {
  //   const courses = await db.course.findMany({
  //     select: {
  //       CourseReview: {
  //         where: {
  //           rating: {
  //             gt: 3.5,
  //           },
  //         },
  //       },
  //     },
  //   });

  //   console.log({ courses });
  // }),

  getAllCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        CourseReview: {
          select: {
            rating: true,
          },
        },
      },
    });

    return courses;
  }),
});
