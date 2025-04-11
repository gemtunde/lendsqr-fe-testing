"use client";

import { JSX, ReactNode } from "react";
// import { Sidebar } from "@/components/ui/sidebar";
// import { Header } from "@/components/ui/header";
import styles from "../styles/main-layout.module.scss";
import { Sidebar } from "./_components/common/Sidebar";
import { Header } from "./_components/common/Header";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
    // <div className={styles.dashboardContainer}>
    //   <Sidebar />
    //   <div className={styles.mainSection}>
    //     <Header />
    //     <main className={styles.content}>{children}</main>
    //   </div>
    // </div>
  );
}
