import { publicProcedure, router, userProcedure } from "../trpc";

import { loginSchema, registerSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/data/getUserByEmail";

import { signIn } from "@/auth";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const userRouter = router({
  registerUser: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { username, email, password } = input;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Account already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return {
        success: "Signed up successfully",
      };
    }),

  loginUser: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Email not registered",
      });
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.password);

    if (!passwordCheck) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Invalid credentials",
      });
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return {
        success: "Signed in successfully",
      };
    } catch (error) {
      console.log({ "ERROR:": error });

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something unexpected happened",
      });
    }
  }),

  getMyCourses: userProcedure.query(async ({ ctx }) => {
    const myCourses = await db.user.findFirst({
      where: {
        id: ctx.userId,
      },
      include: {
        PurchaseCourse: {
          select: {
            courseId: true,
          },
        },
      },
    });

    if (!myCourses) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No course found" });
    }

    const courses = await Promise.all(
      myCourses.PurchaseCourse.map(async ({ courseId }) => {
        const course = await db.course.findFirst({
          where: {
            id: courseId,
          },
          select: {
            title: true,
            id: true,
            Chapter: true,
            image: true,
            difficulty: true,
            category: true
          },
        });

        if (course) {
          return {
            ...course,
            Chapter: course.Chapter.length,
          };
        } else {
          return null;
        }
      })
    );

    return {
      courses,
    };
  }),
});
