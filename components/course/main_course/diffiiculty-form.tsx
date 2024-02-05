"use client";

import { trpc } from "@/app/_trpc/trpc-client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseSchema } from "@/schemas";
import { CourseDifficulty } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DifficultyProps {
  initialValue: CourseDifficulty;
  courseId: string;
}

const DifficultyForm = ({ initialValue, courseId }: DifficultyProps) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      difficulty: initialValue,
    },
  });

  const { mutate: updateCourse, isPending } =
    trpc.course.updateCourse.useMutation({
      onSuccess: () => {
        toast.success("Difficulty level updated");
        router.refresh();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
      onSettled: () => {
        setEdit(false);
      },
    });

  const onSubmit = async (data: z.infer<typeof courseSchema>) => {
    updateCourse({
      values: data,
      courseId,
    });
  };

  const handleEdit = () => setEdit((prev) => !prev);

  const difficultySeed = [
    {
      value: CourseDifficulty.BEGINNER,
      label: "Beginner",
    },
    {
      value: CourseDifficulty.INTERMEDIATE,
      label: "Intermediate",
    },
    {
      value: CourseDifficulty.ADVANCED,
      label: "Advanced",
    },
  ];

  return (
    <div>
      <div className="w-full bg-slate-100 rounded-lg px-4 py-2 shadow-md">
        <div className="flex justify-between">
          <h1 className="text-lg">Course difficulty</h1>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            className={cn(
              "flex items-center text-sm cursor-pointer",
              edit && "text-muted-foreground"
            )}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit title
          </Button>
        </div>
        <div className="mt-4">
          {!edit && (
            <div
              className={cn(
                "font-bold",
                !initialValue && "italic text-slate-500 text-sm font-normal"
              )}
            >
              {initialValue ?? "Difficulty not selected"}
            </div>
          )}
          {edit && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {difficultySeed?.map((dif) => {
                            return (
                              <SelectItem value={dif.value}>
                                {dif.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <Button type="submit" size="sm" disabled={isPending}>
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DifficultyForm;
