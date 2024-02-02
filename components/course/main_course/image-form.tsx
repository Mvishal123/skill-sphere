"use client";

import { Button } from "@/components/ui/button";
import { CameraIcon, PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UploadDropZone from "./image-uploader";
import { trpc } from "@/app/_trpc/trpc-client";
import { toast } from "sonner";
import { z } from "zod";
import { courseSchema } from "@/schemas";

interface imageProps {
  initialValue: string;
  courseId: string;
}

const ImageForm = ({ initialValue, courseId }: imageProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const utils = trpc.useUtils();

  const { mutate: updateCourse, isPending } =
    trpc.course.updateCourse.useMutation({
      onSuccess: () => {
        toast.success("Image updated");
        utils.invalidate();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
      onSettled: () => {
        setEdit(false);
      },
    });

  const handleEdit = () => setEdit((prev) => !prev);
  return (
    <div className="w-full">
      <div className="px-4 py-2 bg-slate-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Course image</h1>
          {!edit ? (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              {!initialValue ? (
                <PlusCircle className="h-4 w-4 mr-2" />
              ) : (
                <PencilIcon className="h-4 w-4 mr-2" />
              )}
              <span>
                {!initialValue || initialValue === "undefined"
                  ? "Upload image"
                  : "edit image"}
              </span>
            </Button>
          ) : (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              <span>Cancel</span>
            </Button>
          )}
        </div>
        <div className="mt-4">
          {!initialValue ||
            (initialValue === "undefined" && !edit && (
              <div className="w-full bg-slate-200 flex aspect-video items-center justify-center">
                <CameraIcon className="text-muted-foreground h-16 w-16" />
              </div>
            ))}
          {edit && (
            <div>
              <UploadDropZone
                courseId={courseId!}
                endPoint="uploadImage"
                onChange={(url) => {
                  updateCourse({ values: { image: url }, courseId });
                }}
              />
            </div>
          )}
          {initialValue && !edit && (
            <div className="relative aspect-video">
              <Image
                fill
                src={initialValue}
                alt="course image"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
