import React from "react";
import { Card, CardContent } from "../ui/card";
import { Rating } from "@mui/material";
import Image from "next/image";
import { currencyConverter } from "@/lib/currency-converter";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  price: number;
  rating: number;
}
const CourseCard = ({
  id,
  category,
  imageUrl,
  price,
  rating,
  title,
}: CourseCardProps) => {
  return (
    <Card className="p-1 w-[300px] h-[260px]">
      <div className="aspect-video relative overflow-hidden border rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-md object-center"
        />
      </div>
      <div>
        <h1 className="text-lg font-bold mt-1 line-clamp-2">{title}</h1>
        <span className="text-xs font-semibold text-slate-500">{category}</span>
      </div>
      <div className="flex justify-between mt-2">
        <div className="font-semibold">{currencyConverter(price)}</div>
        <div>
          <Rating size="small" value={rating} readOnly />
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
