"use client";

import { JSX, ReactNode } from "react";
import styles from "./main-layout.module.scss";
// import styles from "../styles/main-layout.module.scss";
import Header from "./_components/common/Header";
import DashboardSidebar from "./_components/common/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { UserProvider } from "@/context/auth-provider";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <SidebarProvider>
      <div className={styles.dashboardWrapper}>
        <Header />
        <div className="flex flex-grow">
          <DashboardSidebar />
          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </SidebarProvider>
    // </UserProvider>
  );
}
