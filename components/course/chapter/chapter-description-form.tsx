"use client";

import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Editor from "./text-editor";

import EditorPreview from "./text-editor-preview";
import { trpc } from "@/app/_trpc/trpc-client";
import { toast } from "sonner";
import { chapterSchema } from "@/schemas";

interface PageProps {
  initialValue: string;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Required",
  }),
});

const ChapterDescriptionForm = ({
  initialValue,
  courseId,
  chapterId,
}: PageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialValue ? initialValue : "",
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
    <div className="mt-4 rounded-lg bg-slate-100 px-4 py-2 relative shadow-md">
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
            <span className="text-sm"> Edit Description</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {!isEdit && !initialValue && (
          <p className="text-sm text-muted-foreground italic">No description</p>
        )}
        {!isEdit && initialValue && (
          <div>
            <EditorPreview initialValue={initialValue} />
          </div>
        )}
        {isEdit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-3" disabled={isPending}>
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

export default ChapterDescriptionForm;
