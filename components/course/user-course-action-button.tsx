"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/trpc-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ButtonProps {
  courseId: string;
}

const UserCourseActionButton = ({ courseId }: ButtonProps) => {
  const router = useRouter();
  const { mutate: purchase, isPending } =
    trpc.purchase.checkoutCourse.useMutation({
      onSuccess: (res) => { router.push(res.url!)},
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  return (
    <div className="mt-4 space-y-2">
      <Button
        className="w-full bg-slate-800"
        disabled={isPending}
        onClick={() => purchase({ courseId })}
      >
        Enroll now
        {isPending && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
      </Button>
      <Button className="w-full" variant={"outline"} disabled={isPending}>
        Add to cart
      </Button>
    </div>
  );
};

export default UserCourseActionButton;
