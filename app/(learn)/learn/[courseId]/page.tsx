import ReviewButton from "@/components/course/review-button";
import CourseVideoPlayer from "@/components/learn/course-video-player";
import LearnSideBar from "@/components/learn/learn-sidebar";
import { db } from "@/db";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { redirect } from "next/navigation";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }
  const course = await db.course.findFirst({
    where: {
      id: params.courseId,
      userId: session.userId,
      isPublished: true,
    },
    include: {
      Chapter: true,
    },
  });

  const reviewed = await db.purchaseCourse.findFirst({
    where: {
      courseId: params.courseId,
      userId: session.userId,
    },
    select: {
      isReviewed: true,
    },
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="pt-8 px-12 flex-1">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <h1 className="text-xl font-semibold">{course?.title}</h1>
          {!reviewed?.isReviewed && (
            <div className="md:px-12">
              <ReviewButton courseId={params.courseId} />
            </div>
          )}
        </div>
        <div className="relative mt-12 w-full">
          <CourseVideoPlayer />
        </div>
      </div>
      <section className="lg:w-72 h-full lg:relative">
        <LearnSideBar chapters={course?.Chapter!} />
      </section>
    </div>
  );
};

export default CoursePage;
