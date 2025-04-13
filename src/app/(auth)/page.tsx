"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import styles from "../styles/login.scss";
import styles from "../styles/login.module.scss";
import { FormEvent } from "react";
// import SignInImage from "@/assets/images/pablo-sign-in.png";
// import Logo from "@/assets/images/logo.png";
// import Image from "next/image";

export default function LoginPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logoWrapper}>
          {/* <img src="/Group.png" alt="Lendsqr Logo" className={styles.logo} /> */}
          {/* <Image src={Logo} alt="Logo" className={styles.logo} /> */}
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className={styles.logo}
          />
        </div>
        {/* <Image
          src={SignInImage}
          alt="Welcome Illustration"
          className={styles.illustration}
        /> */}
        <img
          src="/assets/images/pablo-sign-in.png"
          alt="Logo"
          className={styles.illustration}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.formCard}>
          <h1 className={styles.heading}>Welcome!</h1>
          <p className={styles.subtext}>Enter details to login.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className={styles.input}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />
            <div className={styles.forgotPassword}>FORGOT PASSWORD?</div>
            <Button type="submit" className={styles.loginButton}>
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
