"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthCardTemplate from "./auth-card";

import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/utils/trpc-client";
import { useState } from "react";
import { ErrorMessage, SuccessMessage } from "@/components/status-message";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const {
    mutate: registerUser,
    isPending,
    data,
  } = trpc.user.registerUser.useMutation({
    onSuccess: (res) => {
      setSuccess(res.success);
    },
    onError: ({ data, message }) => {
      if (data && data.code === "INTERNAL_SERVER_ERROR") {
        setError(message);
      } else {
        setError("Something went wrong");
      }
    },
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    registerUser(values);
  };

  return (
    <div>
      <AuthCardTemplate
        headerLabel="Welcome aboard"
        backLabel="Already have an account?"
        backHref="/auth/login"
        showSocials={success ? false : true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="John.wick@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Password  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {success && (
              <div className="flex flex-col">
                <SuccessMessage label={success} />
                <Link href={"/login"} className="flex gap-2 justify-center mt-1">
                  <p>You are all set to login</p> <ArrowRight />
                </Link>
              </div>
            )}
            {error && <ErrorMessage label={error} />}
            <Button type="submit" className="w-full" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </AuthCardTemplate>
    </div>
  );
};

export default RegisterForm;
