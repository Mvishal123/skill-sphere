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
      <div className="fixed h-full hidden md:inline-block">
        <Sidebar />
      </div>

      <div className="px-10 md:pl-60 h-full">
        <div className="p-10">
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
        <div>
          {courses && (
            <div className="h-[200px] w-full flex flex-col justify-end items-center text-xl gap-2">
              <Ghost className="h-10 w-10" />
              <p> No course </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
