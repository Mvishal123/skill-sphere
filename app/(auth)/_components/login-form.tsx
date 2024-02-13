"use client";

import { useState } from "react";

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

import { ErrorMessage, SuccessMessage } from "@/components/status-message";
import { loginSchema } from "@/schemas";
import { trpc } from "@/utils/trpc-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();

  const { mutate: loginUser, isPending } = trpc.user.loginUser.useMutation({
    onSuccess: (res) => {
      setSuccess(res.success);
      router.push("/");
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
                    <Input placeholder="*****" {...field} type="password" />
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
