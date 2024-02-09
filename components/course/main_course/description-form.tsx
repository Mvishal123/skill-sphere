"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc-client";
import { toast } from "sonner";
import { courseSchema } from "@/schemas";

interface PageProps {
  initialValue: string;
  courseId: string;
}

const DescriptionForm = ({ initialValue, courseId }: PageProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      description: initialValue ? initialValue : "",
    },
  });

  const handleEdit = () => setEdit((prev) => !prev);

  const { mutate: updateCourse, isPending } =
    trpc.course.updateCourse.useMutation({
      onSuccess: () => {
        toast.success("Title updated");
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
  return (
    <div className="rounded-lg bg-slate-100 px-4 py-2 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Course description</h1>
        {!edit ? (
          <Button variant={"ghost"} onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" />{" "}
            <span className="text-sm"> Edit Description</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {!edit && (
          <div className="bg-white py-1 px-2 rounded-md">
            {initialValue && <p>{initialValue}</p>}
            {!initialValue && <p className="italic">no description</p>}
          </div>
        )}
        {edit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. This course is..."
                          defaultValue={initialValue ? initialValue : ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="mt-3"
                  disabled={
                    form.formState.isLoading ||
                    !form.formState.isValid ||
                    form.formState.isSubmitting
                  }
                >
                  Save
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;
