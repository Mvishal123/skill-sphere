import { serverTrpc } from "@/app/_trpc/trpc-server";
import React from "react";
import CarouselContainer from "../carousel-container";
import CourseCard from "../course/course-card";
import { getCourseRating } from "@/utils/helpers/get-course-rating";

const AllCourses = async () => {
  const courses = await serverTrpc.course.getAllCourses();
  console.log({ courses });

  return (
    <div>
      <CarouselContainer>
        {courses.map((course) => {
          const rating = getCourseRating(course.CourseReview);
          return (
            <CourseCard
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
