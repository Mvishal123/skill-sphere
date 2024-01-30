"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { courseTitleSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc-client";
import { toast } from "sonner";

const CreateCourse = () => {
  const router = useRouter();

  const { mutate: createCourse, isPending } =
    trpc.course.createCourse.useMutation({
      onSuccess: (res) => {
        toast.success("Course has been created successfully");
        router.push(`/teach/create/${res.courseId}`);
      },

      onError: (error) => {
        alert(error.message);
      },
    });

  const onSubmitHandler = (values: z.infer<typeof courseTitleSchema>) => {
    createCourse(values);
  };
  const form = useForm<z.infer<typeof courseTitleSchema>>({
    resolver: zodResolver(courseTitleSchema),
    defaultValues: { title: "" },
  });
  return (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <div className="md:w-1/2 w-3/4">
        <div>
          <h1 className="text-3xl mb-12 font-bold">Course title</h1>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What would you like to name your course
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Blockchain courses" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be the name of your course
                    </FormDescription>
                    <FormMessage />
                    <div className="pt-4 space-x-10">
                      <Button type="submit" disabled={isPending}>
                        Create
                      </Button>
                      <Button
                        disabled={isPending}
                        type="button"
                        variant={"secondary"}
                        onClick={() => router.push("/teacher/courses")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
