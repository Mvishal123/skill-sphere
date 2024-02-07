import MaxWidthContainer from "@/components/max-width-container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { currencyConverter } from "@/lib/currency-converter";
import { getCourseRating } from "@/utils/helpers/get-course-rating";
import { Rating } from "@mui/material";
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

  
  const rating = getCourseRating(course?.CourseReview!);
  console.log({rating});
  
  
  

  return (
    <div className="h-60 border-b pt-4 py-4 bg-slate-800">
      <MaxWidthContainer>
        <div className="grid grid-cols-3 w-full h-full b">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="">
              <h1 className="text-3xl font-bold mb-2 text-white">
                {course?.title}{" "}
              </h1>
              <Badge variant={"outline"} className="text-slate-400">
                {course?.category}
              </Badge>
              <div className="mt-4 line-clamp-3 font-semibold text-white">
                {course?.description}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold italic text-white">
                {currencyConverter(course?.cost as number)}
              </div>
              <div>
                <Rating value={rating.rating} />
              </div>
            </div>
          </div>
          <div className="bg-slate-500 col-span-1">hey</div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Course;
