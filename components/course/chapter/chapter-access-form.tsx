"use client";

import { Loader2, Lock, Pencil, Unlock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/app/_trpc/trpc-client";
import { toast } from "sonner";
import { chapterSchema } from "@/schemas";

interface PageProps {
  initialValue: boolean;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAcessForm = ({ initialValue, courseId, chapterId }: PageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialValue,
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const { mutate: updateCourse, isPending } =
    trpc.chapter.chapterUpdate.useMutation({
      onSuccess: () => {
        toast.success("Title updated");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
      onSettled: () => {
        setIsEdit(false);
        router.refresh();
      },
    });
  const onSubmit = async (data: z.infer<typeof chapterSchema>) => {
    updateCourse({
      values: data,
      chapterId,
    });
  };

  return (
    <div className="mt-4 rounded-lg bg-slate-100 px-4 py-2 relative">
      {isPending && (
        <div className="absolute top-0 left-0 right-0 w-full h-full backdrop-blur-sm z-20 flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Chapter description</h1>
        {!isEdit ? (
          <Button variant={"ghost"} onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" />{" "}
            <span className="text-sm"> Edit chapter access</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {!isEdit && !initialValue && (
          <div className="text-md  italic flex items-center gap-2">
            <span>
              <Lock size={15} />
            </span>
            This chapter is locked
          </div>
        )}
        {!isEdit && initialValue && (
          <div className="text-md  italic flex items-center gap-2">
            <span>
              <Unlock size={15} />
            </span>
            This chapter is a free preview
          </div>
        )}
        {isEdit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="isFree"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="border border-slate-200 rounded-lg px-3 py-1 flex items-center justify-start gap-2">
                      <FormControl>
                        <Checkbox
                          id="checkbox"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <label htmlFor="checkbox" className="text-slate-600">
                        Check if you want to make this chapter a free preview
                      </label>
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

export default ChapterAcessForm;
