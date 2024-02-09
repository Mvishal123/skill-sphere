"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import VideoPlayer from "../video-player";
import { trpc } from "@/app/_trpc/trpc-client";
import { Loader2 } from "lucide-react";
import { isFunction } from "@tanstack/react-table";
import { toast } from "sonner";

const CourseVideoPlayer = () => {
  const searchParams = useSearchParams();
  const chapterId = searchParams.get("cid");
  const router = useRouter();

  const { data: chapter, error } = trpc.user.getChapterDetails.useQuery(
    {
      chapterId: chapterId!,
    },
    {
      retry: false,
    }
  );

  if (!chapterId) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Select a chapter
      </div>
    );
  }

  if (!chapter || error) {
    if (error) {
      toast.error("Something went wrong");
      router.push("/mycourses");
    }
    return (
      <div className="h-full flex items-center w-full justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-w-16 aspect-h-9">
        <VideoPlayer videosrc={chapter?.chapter.video!} />
      </div>
    </div>
  );
};

export default CourseVideoPlayer;
