"use client";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import styles from "../../../styles/header.module.scss";
import { JSX } from "react";
// import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header(): JSX.Element {
  return (
    // <header className={styles.header}>
    //   <div className={styles.searchWrapper}>
    //     <input
    //       type="text"
    //       placeholder="Search for anything"
    //       className={styles.searchInput}
    //     />
    //     <Search className={styles.searchIcon} />
    //   </div>
    //   <div className={styles.userSection}>
    //     <Bell className={styles.icon} />
    //     <span className={styles.docsLink}>Docs</span>
    //     <Image
    //       src="/user-avatar.jpg"
    //       alt="User avatar"
    //       width={30}
    //       height={30}
    //       className={styles.avatar}
    //     />
    //     <span className={styles.username}>Adedeji</span>
    //   </div>
    // </header>
    <header className={styles.header}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search for anything" />
        <Search size={16} className={styles.icon} />
      </div>
      <div className={styles.rightSection}>
        <a href="#" className={styles.link}>
          Docs
        </a>
        <Bell className={styles.icon} />
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
