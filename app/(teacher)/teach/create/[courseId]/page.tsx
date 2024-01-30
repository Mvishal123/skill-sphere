import AlertBanner from "@/components/course/alert-banner";
import MaxWidthContainer from "@/components/max-width-container";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Trash } from "lucide-react";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const course = await db.course.findFirst({
    where: {
      id: courseId,
    },
  });

  const requiredField = [
    course?.title,
    course?.description,
    course?.image,
    course?.category,
    course?.cost,
    course?.difficulty,
  ];

  const completedFields = requiredField.filter(Boolean).length;
  const isCompleted = requiredField.length === completedFields;
  return (
    <div>
      <AlertBanner label="This course is not yet published and will not be visible to the users" type="warning"/>
      <div className="pt-10">
        <MaxWidthContainer>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Create a new course</h1>
              <p className="text-md text-slate-500">
                Fields remaining {completedFields}/{requiredField.length}{" "}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" disabled={!isCompleted}>
                Publish
              </Button>
              <Button size="sm">
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </div>
  );
};

export default CoursePage;
