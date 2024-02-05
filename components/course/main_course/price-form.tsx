"use client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { currencyConverter } from "@/lib/currency-converter";
import { courseSchema } from "@/schemas";
import { trpc } from "@/utils/trpc-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface priceProps {
  initialValue: number;
  courseId: string;
}

const PriceForm = ({ initialValue, courseId }: priceProps) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      cost: initialValue | 0,
    },
  });

  console.log(typeof form.getValues("cost"));
  
  

  const { mutate: updateCourse, isPending } =
    trpc.course.updateCourse.useMutation({
      onSuccess: () => {
        toast.success("Price updated");
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
    console.log("Price updating");

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
          <h1 className="text-lg">Chapter price</h1>
          <Button
            size="sm"
            variant={"ghost"}
            onClick={handleEdit}
            className={cn(
              "flex items-center text-sm cursor-pointer",
              edit && "text-muted-foreground"
            )}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit price
          </Button>
        </div>
        <div className="mt-4 ">
          {!edit && (
            <div
              className={cn("font-bold", {
                "italic font-normal text-sm text-slate-500": !initialValue,
              })}
            >
              {<p>{currencyConverter(initialValue)}</p>}
            </div>
          )}
          {edit && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" inputMode="numeric" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <Button type="submit" size="sm" disabled={isPending}>
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={"secondary"}
                    className="ml-3"
                    onClick={handleEdit}
                  >
                    cancel
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

export default PriceForm;
