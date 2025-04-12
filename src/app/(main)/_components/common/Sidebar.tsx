import { ChevronDown } from "lucide-react";
import styles from "../../../styles/sidebar.module.scss";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  SidebarMenuItemType,
  sidebarMenus,
} from "@/components/constants/sidebarMenu";

const DashboardSidebar = () => {
  return (
    <Sidebar className={styles.sidebar}>
      <SidebarContent className={styles.sidebarContent}>
        {sidebarMenus.map((menu, i) => {
          if (menu.type === "menu") {
            return (
              <SidebarGroup key={i} className={styles.sidebarGroup}>
                <SidebarMenu className={styles.sidebarMenu}>
                  {menu.items.map((item: SidebarMenuItemType, idx) => (
                    <SidebarMenuItem
                      key={idx}
                      className={styles.sidebarMenuItem}
                    >
                      <SidebarMenuButton asChild>
                        {item.isOrgSwitcher ? (
                          <button className={styles.organizationButton}>
                            <item.icon className={styles.icon} />
                            <span>{item.label}</span>
                            <ChevronDown className={styles.chevronIcon} />
                          </button>
                        ) : (
                          <a href={item.href} className={styles.menuButton}>
                            <item.icon className={styles.icon} />
                            <span>{item.label}</span>
                          </a>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            );
          }

          if (menu.type === "group") {
            return (
              <SidebarGroup key={i}>
                <SidebarGroupLabel className={styles.sidebarGroupLabel}>
                  {menu.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className={styles.sidebarMenu}>
                    {menu.items.map((item: SidebarMenuItemType, idx) => (
                      <SidebarMenuItem
                        key={idx}
                        className={styles.sidebarMenuItem}
                      >
                        <SidebarMenuButton asChild>
                          <a href={item.href} className={styles.menuButton}>
                            <item.icon
                              className={`${styles.icon} ${item.extraClass || ""}`}
                            />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          return null;
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
