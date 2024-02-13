"use client";
import { currencyConverter } from "@/lib/currency-converter";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  price: number;
  rating: {
    rating: number;
    count: number;
  };
  isPurchased?: boolean;
}

const CourseCard = ({
  id,
  category,
  imageUrl,
  price,
  rating,
  title,
  isPurchased = false,
}: CourseCardProps) => {
  return (
    <Card className="p-1 max-w-full md:max-w-[300px] pb-1">
      <Link href={`/courses/${id}`}>
        <div className="aspect-video relative overflow-hidden border rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-md object-center"
          />
        </div>
        <div className="mt-2 flex flex-col items-start">
          <h1 className="text-base md:text-lg font-bold line-clamp-1">
            {title}
          </h1>
          <span className="text-xs md:text-sm font-semibold text-slate-500">
            {category}
          </span>
        </div>

        {!isPurchased && (
          <div className="flex justify-between mt-2">
            <div className="font-semibold text-xs md:text-sm">
              {currencyConverter(price)}
            </div>
            <div>
              <Rating size="small" value={rating.rating} readOnly />
            </div>
          </div>
        )}
        {isPurchased && (
          <div className="mt-2">
            <Button asChild className="bg-green-700 h-8 w-full" size="sm">
              Hey
            </Button>
          </div>
        )}
      </Link>
    </Card>
  );
};

export default CourseCard;
