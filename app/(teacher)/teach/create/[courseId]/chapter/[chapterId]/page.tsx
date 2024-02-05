import { db } from "@/db";
import Link from "next/link";


import AlertBanner from "@/components/course/alert-banner";
import ChapterAcessForm from "@/components/course/chapter/chapter-access-form";
import ChapterActionButton from "@/components/course/chapter/chapter-action-button";
import ChapterDescriptionForm from "@/components/course/chapter/chapter-description-form";
import ChapterTitleForm from "@/components/course/chapter/chapter-title-form";
import ChapterVideoForm from "@/components/course/chapter/chapter-video-form";
import IconBadge from "@/components/icon-badge";
import MaxWidthContainer from "@/components/max-width-container";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Info, LayoutDashboard } from "lucide-react";

const CoursePage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { chapterId, courseId } = params;

  // const {data: course} = trpc.course.getCourse.useQuery({courseId})
  const chapter = await db.chapter.findFirst({
    where: {
      id: chapterId,
    },
  });

  const requiredField = [chapter?.title, chapter?.description, chapter?.video];

  const completedFields = requiredField.filter(Boolean).length;
  const isCompleted = requiredField.length === completedFields;

  return (
    <div>
      {!chapter?.isPublished && <AlertBanner
        label="This chapter is not yet published and will not be visible to the users"
        type="warning"
      />}
      <div className="pt-10">
        <MaxWidthContainer>
          <Button asChild variant="link">
            <Link href={`/teach/create/${courseId}`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to course setup
            </Link>
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Create chapter</h1>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="text-muted-foreground w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Fill all the fields to publish the chapter.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-md text-slate-500">
                  Fields completed {completedFields}/{requiredField.length}{" "}
                </p>
              </div>
            </div>
            <ChapterActionButton
              isPublished={chapter?.isPublished!}
              chapterId={chapterId}
              isCompleted={isCompleted}
            />
          </div>

          {/* forms */}
          <div className="grid lg:grid-cols-2 mt-12 pb-6 space-x-10">
            {/* Grid col 1 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <IconBadge icon={LayoutDashboard} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Customize your course
                </h1>
              </div>

              <div className="flex flex-col mt-8 space-y-8">
                <ChapterTitleForm
                  chapterId={chapterId}
                  initialValue={chapter?.title!}
                />
                <ChapterDescriptionForm
                  initialValue={chapter?.description!}
                  chapterId={chapterId!}
                  courseId={courseId}
                />
                <ChapterAcessForm
                  initialValue={chapter?.isFree!}
                  chapterId={chapterId!}
                  courseId={chapterId!}
                />
              </div>
            </div>

            {/*  Grid col 2 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <IconBadge icon={LayoutDashboard} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Chapter video
                </h1>
              </div>
              <div className="flex flex-col mt-8 space-y-8">
                <ChapterVideoForm
                  chapterId={chapterId}
                  courseId={courseId}
                  initialValue={chapter?.video ?? ""}
                />
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </div>
  );
};

export default CoursePage;
