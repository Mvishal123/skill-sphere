import CourseCard from "@/components/course/course-card";
import Sidebar from "@/components/course/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/db";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import { Ghost } from "lucide-react";
import React from "react";

interface SearchParamsProps {
  searchParams: {
    category: string;
  };
}

const CoursePage = async ({ searchParams }: SearchParamsProps) => {
  const session = await getServerAuthSession();
  console.log({session});
  

  const splitBySpace = searchParams.category
    ? searchParams.category.split(" ")
    : "";
  const searchKey = searchParams.category ? splitBySpace[0] : undefined;
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      category: {
        search: searchKey ?? undefined,
      },
    },
    include: {
      CourseReview: {
        select: {
          rating: true,
        },
      },
      PurchaseCourse: {
        select: {
          courseId: true,
        },
      },
    },
  });

  let user, purchasedCourses: any;
  if (session?.userId) {
    console.log("inside");
    user = await db.user.findFirst({
      where: {
        id: session.id,
      },
      include: {
        PurchaseCourse: {
          select: {
            courseId: true,
          },
        },
      },
    });

    purchasedCourses = user?.PurchaseCourse ? user.PurchaseCourse : [];
   
    
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar*/}
      <div className="lg:w-1/4 hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:w-3/4 px-4  h-full">
        <div className="p-4 lg:p-10">
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ">
          {!courses ? (
            <div className="h-[200px] w-full flex flex-col justify-end items-center text-xl gap-2">
              <Ghost className="h-10 w-10" />
              <p>No courses found</p>
            </div>
          ) : (
            courses.map((course) => {
              let rating = 0;
              course.CourseReview.forEach((review) => {
                rating += review.rating;
              });
              const isPurchased = !!purchasedCourses.find(
                (pur_course: { courseId: string }) => {
                  return course.id === pur_course.courseId;
                }
              );

              console.log({course: course.id});
              console.log({pur: course.PurchaseCourse});
              
              
              console.log({isPurchased});
              

              return (
                <TooltipProvider key={course.id}>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                      <div >
                        <CourseCard
                          id={course.id}
                          title={course.title}
                          category={course.category!}
                          price={course.cost!}
                          imageUrl={course.image!}
                          rating={rating}
                          isPurchased={isPurchased}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{course.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
