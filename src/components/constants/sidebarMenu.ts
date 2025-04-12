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
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarMenuItemType = {
  label: string;
  href: string;
  icon: LucideIcon;
  extraClass?: string;
  isOrgSwitcher?: boolean;
};

export type SidebarMenuGroupType = {
  type: "group";
  label: string;
  items: SidebarMenuItemType[];
};

export type SidebarMenuSingleType = {
  type: "menu";
  items: SidebarMenuItemType[];
};

export type SidebarMenuType = SidebarMenuGroupType | SidebarMenuSingleType;

export const sidebarMenus = [
  {
    type: "menu",
    items: [
      {
        label: "Switch Organization",
        href: "#",
        icon: Building,
        isOrgSwitcher: true,
      },
    ],
  },
  {
    type: "menu",
    items: [
      {
        label: "Dashboard",
        href: "/home",
        icon: Home,
        //isOrgSwitcher: false,
      },
    ],
  },
  {
    type: "group",
    label: "Customers",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Guarantors", href: "/guarantors", icon: UserCheck },
      { label: "Loans", href: "/loans", icon: Database },
      {
        label: "Decision Models",
        href: "/decision-models",
        icon: BarChartHorizontal,
      },
      { label: "Savings", href: "/savings", icon: PiggyBank },
      { label: "Loan Requests", href: "/loan-requests", icon: FileText },
      { label: "Whitelist", href: "/whitelist", icon: UserCheck },
      {
        label: "Karma",
        href: "/karma",
        icon: UserCheck,
        extraClass: "text-red-500",
      },
    ],
  },
  {
    type: "group",
    label: "Businesses",
    items: [
      { label: "Organization", href: "/organization", icon: Building },
      { label: "Loan Products", href: "/loan-products", icon: CreditCard },
      { label: "Savings Products", href: "/savings-products", icon: Landmark },
      { label: "Fees and Charges", href: "/fees", icon: ClipboardList },
      { label: "Transactions", href: "/transactions", icon: Receipt },
    ],
  },
  {
    type: "group",
    label: "Settings",
    items: [
      { label: "Preferences", href: "/preferences", icon: Settings },
      { label: "Fees and Pricing", href: "/fees-pricing", icon: ClipboardList },
      { label: "Audit Logs", href: "/audit-logs", icon: ShieldAlert },
    ],
  },
];
