"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import styles from "./signup.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/services/authServices";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });
  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: "Name is required",
      }),
      email: z.string().trim().email().min(1, {
        message: "Email is required",
      }),
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (res) => {
        setIsSubmitted(true);
        toast(res.data.message);
        // router.replace("/")
      },
      onError: (error) => {
        toast(error.message);
      },
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logoWrapper}>
          {/* <Image src={Logo} alt="Logo" className={styles.logo} /> */}
          <img
            src="/assets/images/logo.png"
            // src="https://lendsqr.com/assets/icons/LSQ%20Logo.svg"
            alt="Logo"
            className={styles.logo}
          />
        </div>

        <img
          src="/assets/images/pablo-sign-in.png"
          alt="Logo"
          className={styles.illustration}
        />
      </div>
      <div className={styles.rightSection}>
        {!isSubmitted ? (
          <div className={styles.formCard}>
            <h1 className={styles.heading}>Register</h1>
            <p className={styles.subtext}>Enter details to create account.</p>
            <Form {...form}>
              <form
                className={styles.form}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          {...field}
                          className={styles.input}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="subscribeto@lendsqr.com"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={styles.input}
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={styles.input}
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  className={styles.forgotPassword}
                  onClick={() => router.replace("/")}
                >
                  Login
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  className={styles.loginButton}
                >
                  REGISTER
                  {isPending && <Loader className="animate-spin" />}
                  <ArrowRight />
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link href="/">
              <Button className="h-[40px] hover:bg-blue-700 bg-blue-500 text-white">
                Go to login
                <ArrowRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
