"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "../../../styles/sidebar.module.scss";
import { JSX } from "react";
import { Home, Users, Settings } from "lucide-react";
const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Users",
    path: "/dashboard/users",
  },
  {
    label: "Guarantors",
    path: "/dashboard/guarantors",
  },
  {
    label: "Loans",
    path: "/dashboard/loans",
  },
];

export function Sidebar(): JSX.Element {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Lendsqr</div>
      <nav className={styles.nav}>
        <a href="#" className={styles.link}>
          <Home size={18} /> Dashboard
        </a>
        <a href="#" className={styles.link}>
          <Users size={18} /> Users
        </a>
        <a href="#" className={styles.link}>
          <Settings size={18} /> Settings
        </a>
      </nav>
    </aside>

    // <aside className={styles.sidebar}>
    //   <div className={styles.logo}>lendsqr</div>
    //   <nav>
    //     <ul className={styles.navList}>
    //       {navItems.map((item) => (
    //         <li key={item.label}>
    //           <Link href={item.path} className={styles.navItem}>
    //             {item.label}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </nav>
    // </aside>
  );
}
