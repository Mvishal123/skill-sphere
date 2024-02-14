"use client";

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rating } from "@mui/material";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { trpc } from "@/app/_trpc/trpc-client";
import { toast } from "sonner";

interface ReviewButtonProps {
  courseId: string;
}
const ReviewButton = ({ courseId }: ReviewButtonProps) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>();

  const { mutate: giveReview, isPending } = trpc.user.giveReview.useMutation({
    onSuccess: () => {
      toast.success("Thanks for submitting a review");
    },
    onError: () => toast.error("Something went wrong"),
  });

  const onSubmit = () => {
    giveReview({
      courseId,
      rating,
      review,
    });
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger>
          <Button variant={"link"} className="text-xs">
            <Star fill="orange" className="text-transparent w-4 h-4 mr-2" />
            How are you liking this course?
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader className="w-full text-3xl font-bold">
            Leave us a review 😀
          </DialogHeader>
          <div>
            <Rating
              value={rating}
              onChange={(_, value) => setRating(value ?? 0)}
            />
            <div className="mt-4">
              <label htmlFor="textarea" className="font-semibold">
                Wanna tell us something...
              </label>
              <Textarea
                id="textarea"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewButton;
