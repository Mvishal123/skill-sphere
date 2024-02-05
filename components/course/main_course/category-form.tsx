"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Check, ChevronsUpDown } from "lucide-react";
import { trpc } from "@/app/_trpc/trpc-client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CategoryProps {
  initialValue: string;
  courseId: string;
}

const CategoryForm = ({ initialValue, courseId }: CategoryProps) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      category: initialValue,
    },
  });

  const { mutate: updateCourse, isPending } =
    trpc.course.updateCourse.useMutation({
      onSuccess: () => {
        toast.success("Title updated");
        utils.invalidate();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
      onSettled: () => {
        setEdit(false);
      },
    });

  const { data: categories } = trpc.course.getCategories.useQuery();


  const onSubmit = async (data: z.infer<typeof courseSchema>) => {

    updateCourse({
      values: data,
      courseId,
    });
  };

  const handleEdit = () => setEdit((prev) => !prev);

  return (
    <div>
      <div className="w-full bg-slate-100 rounded-lg px-4 py-2 shadow-md">
        <div className="flex justify-between">
          <h1 className="text-lg">Course category</h1>
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
              {initialValue ?? "Category not selected"}
            </div>
          )}
          {edit && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((course) => {
                            return (
                              <SelectItem value={course.category}>
                                {course.category}
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

export default CategoryForm;
