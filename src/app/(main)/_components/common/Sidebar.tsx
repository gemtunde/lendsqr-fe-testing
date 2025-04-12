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
  Home,
  Users,
  UserCheck,
  Database,
  BarChartHorizontal,
  PiggyBank,
  FileText,
  ClipboardList,
  Settings,
  ShieldAlert,
  Receipt,
  CreditCard,
  Building,
  Landmark,
  ChevronDown,
} from "lucide-react";
import styles from "../../../styles/sidebar.module.scss";
//import styles from './DashboardSidebar.module.scss';

const DashboardSidebar = () => {
  return (
    <Sidebar className={styles.sidebar}>
      <SidebarContent className={styles.sidebarContent}>
        <SidebarGroup className={styles.sidebarGroup}>
          <SidebarMenu className={styles.sidebarMenu}>
            <SidebarMenuItem className={styles.sidebarMenuItem}>
              <SidebarMenuButton asChild>
                <button className={styles.organizationButton}>
                  <Building className={styles.icon} />
                  <span>Switch Organization</span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className={styles.sidebarGroup}>
          <SidebarMenu className={styles.sidebarMenu}>
            <SidebarMenuItem className={styles.sidebarMenuItem}>
              <SidebarMenuButton asChild>
                <a href="/dashboard" className={styles.menuButton}>
                  <Home className={styles.icon} />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={styles.sidebarGroupLabel}>
            Customers
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={styles.sidebarMenu}>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a
                    href="/users"
                    className={`${styles.menuButton} ${styles.active}`}
                  >
                    <Users className={styles.icon} />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/guarantors" className={styles.menuButton}>
                    <UserCheck className={styles.icon} />
                    <span>Guarantors</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/loans" className={styles.menuButton}>
                    <Database className={styles.icon} />
                    <span>Loans</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/decision-models" className={styles.menuButton}>
                    <BarChartHorizontal className={styles.icon} />
                    <span>Decision Models</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/savings" className={styles.menuButton}>
                    <PiggyBank className={styles.icon} />
                    <span>Savings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/loan-requests" className={styles.menuButton}>
                    <FileText className={styles.icon} />
                    <span>Loan Requests</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/whitelist" className={styles.menuButton}>
                    <UserCheck className={styles.icon} />
                    <span>Whitelist</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/karma" className={styles.menuButton}>
                    <UserCheck className={`${styles.icon} text-red-500`} />
                    <span>Karma</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={styles.sidebarGroupLabel}>
            Businesses
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={styles.sidebarMenu}>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/organization" className={styles.menuButton}>
                    <Building className={styles.icon} />
                    <span>Organization</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/loan-products" className={styles.menuButton}>
                    <CreditCard className={styles.icon} />
                    <span>Loan Products</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/savings-products" className={styles.menuButton}>
                    <Landmark className={styles.icon} />
                    <span>Savings Products</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/fees" className={styles.menuButton}>
                    <ClipboardList className={styles.icon} />
                    <span>Fees and Charges</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/transactions" className={styles.menuButton}>
                    <Receipt className={styles.icon} />
                    <span>Transactions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={styles.sidebarGroupLabel}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={styles.sidebarMenu}>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/preferences" className={styles.menuButton}>
                    <Settings className={styles.icon} />
                    <span>Preferences</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/fees-pricing" className={styles.menuButton}>
                    <ClipboardList className={styles.icon} />
                    <span>Fees and Pricing</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={styles.sidebarMenuItem}>
                <SidebarMenuButton asChild>
                  <a href="/audit-logs" className={styles.menuButton}>
                    <ShieldAlert className={styles.icon} />
                    <span>Audit Logs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
