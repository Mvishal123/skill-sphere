import MaxWidthContainer from "@/components/max-width-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { currencyConverter } from "@/lib/currency-converter";
import { getCourseRating } from "@/utils/helpers/get-course-rating";
import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      Chapter: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  const rating = getCourseRating(course?.CourseReview!);

  return (
    <div>
      <div className="border-b pt-4 py-4 h-60 bg-slate-800 relative -z-0">
        <MaxWidthContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full h-full b">
            <div className="col-span-2 flex flex-col justify-between">
              <div className="pr-12">
                <h1 className="text-4xl font-sans font-bold mb-2 text-white line-clamp-2">
                  {course?.title}{" "}
                </h1>
                <Badge variant={"outline"} className="text-slate-400">
                  {course?.category}
                </Badge>
                <div className="flex gap-2 items-center mt-2">
                  {rating.count > 0 && (
                    <Rating value={rating.rating} readOnly size="small" />
                  )}
                  {rating.count === 0 && (
                    <p className="italic text-sm text-slate-300">No reviews</p>
                  )}
                  <span className="text-slate-300 text-xs ">
                    ({rating.count})
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold italic text-white mt-4">
                  {currencyConverter(course?.cost as number)}
                </div>
              </div>
            </div>

            {/* Image section */}
            <div className="relative">
              <div className="md:absolute translate-y-10 p-1 md:justify-center lg:translate-x-0">
                <div className=" bg-slate-400/50 border border-gray-400 rounded-lg w-[350px] md:w-[300px] lg:w-[400px] p-1">
                  <div className="bg-slate-500 col-span-1 rounded-lg aspect-video relative">
                    <Image
                      src={course?.image as string}
                      fill
                      alt={course?.title as string}
                      className="object-center rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-slate-800">Enroll now</Button>
                  <Button className="w-full" variant={"outline"}>
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </div>

      {/* contents */}
      <MaxWidthContainer>
        <div className=" md:max-w-[50%] mt-72 md:mt-12">
          <h1 className="text-3xl font-bold">About</h1>
          <div className="pt-2">
            {course?.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            officia placeat debitis dolorum adipisci reprehenderit aliquid,
            molestiae ipsam consequatur molestias delectus! Qui earum recusandae
            non, repudiandae ad mollitia nesciunt illum? In iusto quam
            distinctio! Nam eligendi aliquam provident quis dolores, facilis
            voluptas dolor. Dicta illum quibusdam itaque voluptas explicabo vel
            alias cum quas nobis ea, recusandae error, ullam molestias
            accusamus.
          </div>
        </div>
        <div className="pt-6">
          <h1 className="text-3xl font-bold">Chapters</h1>
          <div className="w-[80vw] md:w-[50vw]">
            <Accordion type="multiple">
              {course?.Chapter.map((chapter) => {
                return (
                  <AccordionItem value={chapter.title!} key={chapter.id}>
                    <AccordionTrigger>{chapter.title}</AccordionTrigger>
                    <AccordionContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${chapter.description} `,
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Course;

{
  /* <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem> */
}
