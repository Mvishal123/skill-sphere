"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { trpc } from "@/utils/trpc-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CourseActionButtonProps {
  isCompleted: Boolean;
  isPublished: Boolean;
  chapterId: string;
}

const ChapterActionButton = ({
  isCompleted,
  isPublished = false,
  chapterId,
}: CourseActionButtonProps) => {
  const router = useRouter();

  const { mutate: deleteChapter, isPending } =
    trpc.chapter.deleteChapter.useMutation({
      onSuccess: ({ courseId }) => {
        toast.success("Chapter deleted successfully");
        router.push(`/teach/create/${courseId}`);
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const { mutate: publishChapter, isPending: isPublishing } =
    trpc.chapter.publishChapter.useMutation({
      onSuccess: (res) => {
        toast.success(res);
        router.refresh();
      },
      onError: ({ message }) => toast.error(message),
    });

  const { mutate: unpublishChapter, isPending: isUnpublishing } =
    trpc.chapter.unpublishChapter.useMutation({
      onSuccess: (res) => {
        toast.success(res);
        router.refresh();
      },
      onError: ({ message }) => toast.error(message),
    });
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="secondary"
        disabled={isPublishing || isUnpublishing}
        onClick={() => {
          isPublished
            ? unpublishChapter({
                chapterId,
              })
            : publishChapter({
                chapterId,
              });
        }}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      {/* TODO: onclick */}
      <Button size="sm" onClick={() => deleteChapter({ chapterId })}>
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default ChapterActionButton;
