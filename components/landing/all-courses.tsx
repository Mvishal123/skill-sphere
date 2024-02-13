import { serverTrpc } from "@/app/_trpc/trpc-server";
import React from "react";
import CarouselContainer from "../carousel-container";
import CourseCard from "../course/course-card";
import { getCourseRating } from "@/utils/helpers/get-course-rating";
import { ChevronRightIcon } from "lucide-react";

const AllCourses = async () => {
  const courses = await serverTrpc.course.getAllCourses();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Explore courses </h1>
      </div>
      <CarouselContainer settings={{ infinite: false, slideToShow: 4}}>
        {courses.map((course) => {
          const rating = getCourseRating(course.CourseReview);
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              category={course.category!}
              imageUrl={course.image!}
              price={course.cost!}
              rating={{ rating: rating.rating, count: rating.count }}
            />
          );
        })}
      </CarouselContainer>
    </div>
  );
};

export default AllCourses;
