"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { trpc } from "@/utils/trpc-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import { useState } from "react";

interface CourseActionButtonProps {
  isCompleted: Boolean;
  isPublished: Boolean;
  courseId: string;
}

const CourseActionButton = ({
  isCompleted,
  isPublished = false,
  courseId,
}: CourseActionButtonProps) => {
  const [confetti, setConfetti] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: deleteCourse, isPending } =
    trpc.course.deleteCourse.useMutation({
      onSuccess: () => {
        toast.success("Course deleted successfully");
        router.push("/teach");
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const { mutate: publishCourse, isPending: isPublishing } =
    trpc.course.publishCourse.useMutation({
      onSuccess: () => {
        toast.success("Course published successfully");
        router.refresh();
        setConfetti(true);
        setTimeout(() => {
          setConfetti(false);
        }, 5000);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const { mutate: unpublishCourse, isPending: isUnpublishing } =
    trpc.course.unpublishCourse.useMutation({
      onSuccess: () => {
        toast.success("Course unpublished successfully");
        router.refresh();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const { width, height } = useWindowSize();

  return (
    <div className="flex items-center gap-4">
      {confetti && <Confetti recycle={false} numberOfPieces={400} width={width!} height={height!} />}
      <Button
        variant="secondary"
        disabled={!isCompleted || isPending || isUnpublishing || isPublishing}
        onClick={() => {
          isPublished
            ? unpublishCourse({ courseId })
            : publishCourse({ courseId });
        }}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size="sm" onClick={() => deleteCourse({ courseId })}>
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default CourseActionButton;
