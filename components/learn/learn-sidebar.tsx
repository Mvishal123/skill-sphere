"use client";

import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { PlayCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface LearnSideBarProps {
  chapters: Chapter[];
}

const LearnSideBar = ({ chapters }: LearnSideBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chapterId = searchParams.get("cid");

  const changeChapter = (id: string) => {
    if (chapterId !== id) {
      router.push(`/learn/${chapters[0].courseId}?cid=${id}`);
    }
  };

  return (
    <div className="h- lg:border-r lg:border-l-2 lg:overflow-auto">
      <div className="bg-slate-100 pt-6 flex items-center">
        <h1 className="px-2 text-xl font-semibold">Contents</h1>
      </div>
      <div className="flex flex-col pt-4 gap-4">
        {chapters?.map((chapter) => {
          return (
            <div
              key={chapter.id}
              className={cn(
                "h-10 border-b-2 flex justify-between items-center pl-2 cursor-pointer",
                chapterId === chapter.id && "border-r-3  border-purple-500"
              )}
              onClick={() => changeChapter(chapter.id)}
            >
              <div className="flex items-center line-clamp-1">
                <PlayCircle className="h-5 w-5 mr-2" />
                {chapter.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearnSideBar;
