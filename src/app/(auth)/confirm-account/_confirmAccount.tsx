"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MailCheck, AlertCircle, CheckCircle } from "lucide-react";
import styles from "./confirm-account.module.scss";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailMutationFn } from "@/services/authServices";
import { toast } from "sonner";
import Image from "next/image";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code") as string;
  const [isVerified, setIsVerified] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast.error("Invalid or expired reset link");
      router.replace("/");
      return;
    }
    const data = {
      code: code,
    };
    mutate(data, {
      onSuccess: (res) => {
        setIsVerified(true);
        toast.success(res.data.message);
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <div className={styles.logo}>
              <Image
                src="https://lendsqr.com/assets/icons/LSQ%20Logo.svg"
                alt="Logo"
                width={140}
                height={50}
              />
            </div>
            <div className={styles.iconContainer}>
              <MailCheck size={28} />
            </div>
            <h1 className={styles.title}>Email Confirmation</h1>
            <p className={styles.subtitle}>
              {isVerified
                ? "Your email has been verified successfully!"
                : "Please confirm your email address to continue"}
            </p>
          </CardHeader>

          <CardContent>
            {isVerified ? (
              <div className={styles.verifiedContainer}>
                <CheckCircle className={styles.verifiedIcon} size={48} />
                <p className={styles.verifiedText}>
                  Your email has been verified successfully!
                </p>
                <p className={styles.verifiedSubtext}>
                  You may now proceed to use all features of the application.
                </p>
              </div>
            ) : (
              <div className={styles.formFooter}>
                <Button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isPending}
                  onClick={handleSubmit}
                >
                  {isPending ? "Verifying..." : "Verify Email"}
                  {isPending && <Loader className="animate-spin" />}
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className={styles.cardFooter}>
            <div className={styles.infoBox}>
              <AlertCircle size={16} className={styles.infoIcon} />
              <p className={styles.infoText}>
                Didn't receive an email? Check your spam folders.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
