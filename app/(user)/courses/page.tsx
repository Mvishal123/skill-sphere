import CourseCard from "@/components/course/course-card";
import Sidebar from "@/components/course/sidebar";
import { db } from "@/db";
import { Ghost } from "lucide-react";
import React from "react";

interface SearchParamsProps {
  searchParams: {
    category: string;
  };
}

const CoursePage = async ({ searchParams }: SearchParamsProps) => {
  // TODO: do not render already purchased courses

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
    },
  });

  console.log({ courses });

  return (
    <div className="">
      {/* Sidebar*/}
      <div className="fixed h-full hidden md:block">
        <Sidebar />
      </div>

      <div className="px-10 md:pl-60 h-full">
        <div className="p-10">
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
        <div className="px-4 md:px-10">
          {!courses && (
            <div className="h-[200px] w-full flex flex-col justify-end items-center text-xl gap-2">
              <Ghost className="h-10 w-10" />
              <p> No course </p>
            </div>
          )}
          {courses && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                let rating = 0;
                course.CourseReview.forEach((review) => {
                  rating += review.rating;
                });
                return (
                  <div key={course.id} className="w-200px h-150px">
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      category={course.category!}
                      price={course.cost!}
                      imageUrl={course.image!}
                      rating={4.5}
                    />
                  </div>  
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
