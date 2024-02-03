import { metadata } from "@/app/layout";
import { db } from "@/db";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

const courseAuth = async (courseId: string) => {
  const session = await getServerAuthSession();

  if (!session) {
    throw new UploadThingError("You must be logged in to upload a file");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course || !course?.id) {
    throw new UploadThingError("Course not found");
  }

  return {
    userId: session.userId,
    courseId,
  };
};

const videoAuth = async (courseId: string, chapterId: string) => {
  console.log("Inside middleware");

  const session = await getServerAuthSession();

  if (!session) {
    throw new UploadThingError("You must be logged in to upload a file");
  }

  console.log({ courseId, chapterId });

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course || !course?.id) {
    throw new UploadThingError("Course not found");
  }

  const chapter = await db.chapter.findUnique({ 
    where: {
      id: chapterId,
    },
  });

  if (!chapter || !chapter?.id) {
    throw new UploadThingError("Chapter not found");
  }

  return {
    userId: session.userId,
    courseId,
    chapterId,
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  uploadImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .middleware(async ({ input }) => courseAuth(input.courseId))

    .onUploadComplete(async ({ metadata, file }) => {
      try {
        await db.course.update({
          where: {
            id: metadata.courseId,
          },
          data: {
            image: file.url,
          },
        });

        return file;
      } catch (error) {
        console.log("[UPLOADTHING COURSE IMAGE ERROR]:", error);
        throw new UploadThingError(
          "Something is wrong in our server. Try again later..."
        );
      }
    }),

  uploadVideo: f({ video: { maxFileSize: "16GB", maxFileCount: 1 } })
    .input(
      z.object({
        chapterId: z.string(),
        courseId: z.string(),
      })
    )
    .middleware(async ({ input }) => videoAuth(input.courseId, input.chapterId))
    .onUploadComplete(async ({ metadata, file }) => {
      const { chapterId, courseId } = metadata;
      try {
        const chapter = await db.chapter.update({
          where: {
            courseId,
            id: chapterId,
          },  
          data: {
            video: file.url,
          },
        });
      } catch (error: any) {
        console.log("[VIDEO UPLOAD ERROR]:", error);

        throw new UploadThingError("Something went wrong when uploading...");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
