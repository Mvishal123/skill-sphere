"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" }),
});

const CreateCourse = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const onSubmitHandler = async (data: z.infer<typeof formSchema>) => {
    //...
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
                      <Button
                        type="submit"
                        disabled={
                          !form.formState.isValid || form.formState.isLoading
                        }
                      >
                        Create
                      </Button>
                      <Button
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
