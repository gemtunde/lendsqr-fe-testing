"use client";

import { JSX, ReactNode } from "react";
// import { Sidebar } from "@/components/ui/sidebar";
// import { Header } from "@/components/ui/header";
import styles from "../styles/main-layout.module.scss";
//import { Sidebar } from "./_components/common/Sidebar";
import Header from "./_components/common/Header";
import DashboardSidebar from "./_components/common/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
//import { Header } from "./_components/common/Header";
//import { Toaster } from "@/components/ui/toaster";
//import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        {/* <Toaster />
        <Sonner /> */}
        <div className={styles.dashboardWrapper}>
          <Header />
          <div className="flex flex-grow">
            <DashboardSidebar />
            <main className={styles.mainContent}>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
