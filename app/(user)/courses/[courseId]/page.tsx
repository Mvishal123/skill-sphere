import MaxWidthContainer from "@/components/max-width-container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { currencyConverter } from "@/lib/currency-converter";
import { getCourseRating } from "@/utils/helpers/get-course-rating";
import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";

interface CourseProps {
  courseId: string;
}

const Course = async ({ params }: { params: CourseProps }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      CourseReview: {
        select: {
          rating: true,
        },
      },
    },
  });

  const rating = 4 || getCourseRating(course?.CourseReview!);

  return (
    <div className="border-b pt-4 py-4 bg-slate-800 relative">
      <MaxWidthContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full h-full b">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="pr-12">
              <h1 className="text-3xl font-bold mb-2 text-white line-clamp-2">
                {course?.title}{" "}
              </h1>
              <Badge variant={"outline"} className="text-slate-400">
                {course?.category}
              </Badge>
              <div className="mt-4 line-clamp-3 font-semibold text-white">
                {course?.description}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold italic text-white mt-4">
                {currencyConverter(course?.cost as number)}
              </div>
              <div className="">
                <Rating value={rating} readOnly size="small" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="md:absolute translate-y-10 md:translate-20 p-1 md:justify-center lg:translate-x-0 bg-slate-400/50 border border-gray-400 rounded-lg w-[350px] md:w-[300px] lg:w-[400px]">
              <div className="bg-slate-500 col-span-1 rounded-lg aspect-video relative">
                <Image
                  src={course?.image as string}
                  fill
                  alt={course?.title as string}
                  className="object-center rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Course;
