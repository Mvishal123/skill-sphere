import { CourseDifficulty } from "@prisma/client";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import IconBadge from "../icon-badge";
import { Book } from "lucide-react";

interface MyCourseCardProps {
  id: string;
  title: string;
  image: string;
  chapterCount: number;
  difficuly: CourseDifficulty;
  category: string;
}
const MyCourseCard = ({
  id,
  title,
  image,
  chapterCount,
  difficuly,
  category,
}: MyCourseCardProps) => {
  return (
    <Card className="p-1 w-full rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="p-1 bg-slate-300/30 rounded-lg border w-[210px]">
          <div className="w-[200px]  relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="relative rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between w-full px-2">
          <div>
            <h1 className="text-sm md:text-lg font-semibold line-clamp-2">
              {title}
            </h1>
            <span>
              <Badge className="h-4" variant={"secondary"}>
                {category}
              </Badge>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-slate-200 p-1 rounded-full">
                <Book strokeWidth={1} className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-500 italic">{chapterCount} chapters</span>
            </div>
            <Button size="sm" className="">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyCourseCard;
