
import MaxWidthContainer from "@/components/max-width-container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { currencyConverter } from "@/lib/currency-converter";
import { getCourseRating } from "@/utils/helpers/get-course-rating";
import { Rating } from "@mui/material";
import Image from "next/image";

import UserCourseActionButton from "@/components/course/user-course-action-button";
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
      <div className="border-b pt-4 py-4 bg-slate-800 h-60 w-screen">
        <MaxWidthContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="pr-6">
                <h1 className="text-3xl font-bold text-white mb-2 line-clamp-2">
                  {course?.title}
                </h1>
                <Badge variant="outline" className="text-slate-400">
                  {course?.category}
                </Badge>
                <div className="flex items-center mt-2">
                  {rating.count > 0 ? (
                    <Rating value={rating.rating} readOnly size="small" />
                  ) : (
                    <p className="italic text-sm text-slate-300">No reviews</p>
                  )}
                  <span className="text-slate-300 text-xs ml-1">
                    ({rating.count})
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-xl font-bold italic text-white">
                  {currencyConverter(course?.cost as number)}
                </div>
              </div>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <div className="md:absolute translate-y-3 md:translate-y-10 p-1 md:justify-center lg:translate-x-0">
                <div className=" bg-slate-400/50 border border-gray-400 rounded-lg w-[300px] md:w-[300px] lg:w-[400px] p-1">
                  <div className="bg-slate-500 col-span-1 rounded-lg aspect-video relative">
                    <Image
                      src={course?.image as string}
                      fill
                      alt={course?.title as string}
                      className="object-center rounded-lg"
                    />
                  </div>
                </div>
                <UserCourseActionButton courseId={course?.id!} />
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </div>

      {/* Contents */}
      <MaxWidthContainer>
        <div className="md:max-w-[50%] mt-72 md:mt-12">
          <div className="">
            <h2 className="text-2xl font-bold">About</h2>
            <div className="pt-2">{course?.description}</div>
          </div>
          <div className="pt-6">
            <h2 className="text-2xl font-bold">Chapters</h2>
            <div className="w-full">
              <Accordion type="multiple">
                {course?.Chapter.map((chapter) => (
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
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Course;
