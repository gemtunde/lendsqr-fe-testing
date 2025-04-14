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
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginMutationFn } from "@/services/authServices";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/auth-provider";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });
  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const { setUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        const { name, email, isEmailVerified } = res.data.loginUser;
        setUser({ name, email, isEmailVerified });
        router.replace("/home");
      },
      onError: (error) => {
        toast.error(error.message);
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
        <div className={styles.formCard}>
          <h1 className={styles.heading}>Login</h1>
          <p className={styles.subtext}>Enter details to Login.</p>
          <Form {...form}>
            <form
              className={styles.form}
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                  <FormItem className={styles.passwordWrapper}>
                    <FormControl>
                      <div className={styles.passwordInputContainer}>
                        <Input
                          className={styles.input}
                          type={showPassword ? "text" : "password"}
                          placeholder="****"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={styles.toggleButton}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={styles.forgotPassword}
                // onClick={() => router.replace("/signup")}
              >
                Forgot Password?
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className={styles.loginButton}
              >
                LOGIN
                {isPending && <Loader className="animate-spin" />}
                <ArrowRight />
              </Button>
            </form>
            <div
              className={styles.signupText}
              onClick={() => router.replace("/signup")}
            >
              Don't have an Account? Register
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
