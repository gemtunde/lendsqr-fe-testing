import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import styles from "../../../styles/header.module.scss";
import Image from "next/image";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoSrc, setLogoSrc] = useState("/assets/images/logo.png");

  useEffect(() => {
    const envLogo = process.env.NEXT_PUBLIC_LOGO_URL;
    if (envLogo) {
      setLogoSrc(envLogo);
    }
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <SidebarTrigger className="mr-4 lg:hidden" />
          <Image
            src={logoSrc}
            alt="Lendsqr"
            width={140}
            height={50}
            className={styles.logoImage}
          />
        </div>
      </div>

      <div className={styles.searchContainer}>
        <Input
          type="text"
          placeholder="Search for anything"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="default" className={styles.searchButton}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className={styles.rightSection}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>
        <div className={styles.notificationContainer}>
          <Bell className={styles.notificationIcon} />
          <span className={styles.notificationBadge}></span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={styles.profileContainer}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className={styles.profileName}>Adedeji</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
