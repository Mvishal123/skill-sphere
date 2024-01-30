"use client";

import React, { useState } from "react";

import AuthCardTemplate from "./auth-card";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas";
import { trpc } from "@/utils/trpc-client";
import { ErrorMessage, SuccessMessage } from "@/components/status-message";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const { mutate: loginUser, isPending } = trpc.user.loginUser.useMutation({
    onSuccess: (res) => {
      setSuccess(res.success);
    },

    onError: ({ data, message }) => {
      if (data?.code === "CONFLICT" || data?.code === "NOT_FOUND") {
        setError(message);
      } else {
        setError("Something unexpected happened");
      }
    },

    onSettled: () => {
      if (success && !error) {
        return redirect("/");
      }
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setSuccess("");
    setError("");
    loginUser(values);
  };

  return (
    <div>
      <AuthCardTemplate
        headerLabel="Welcome back"
        backLabel="Don't have an account?"
        backHref="/auth/register"
        showSocials={true}
      >
        {/* Email */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-email@gmail.com" {...field} />
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
            {success && <SuccessMessage label={success} />}
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

export default LoginForm;
