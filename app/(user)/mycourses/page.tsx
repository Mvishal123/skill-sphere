"use client";

import { trpc } from "@/app/_trpc/trpc-client";
import MyCourseCard from "@/components/course/my-course-card";
import MaxWidthContainer from "@/components/max-width-container";
import { useState } from "react";

const page = () => {
  //   const [courses, setCourses] = useState<[]>([]);

  const { data } = trpc.user.getMyCourses.useQuery();

  return (
    <div className="h-full pt-24">
      <MaxWidthContainer>
        <div className="pt-6">
          <h1 className="text-3xl font-bold">My courses</h1>
        </div>
        <div className="pt-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data?.courses.map((course) => {
              return (
                <MyCourseCard
                  key={course?.id}
                  id={course?.id!}
                  chapterCount={course?.Chapter!}
                  difficuly={course?.difficulty!}
                  image={course?.image!}
                  title={course?.title!}
                  category={course?.category!}
                />
              );
            })}
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default page;
