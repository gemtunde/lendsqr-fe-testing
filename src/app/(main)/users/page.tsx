"use client";
import React from "react";
import { Users, Users2, PiggyBank, DatabaseIcon } from "lucide-react";
import UsersTable from "../_components/common/UsersTable";
import UserStatsCard from "../_components/common/UserStatsCard";
import styles from "../../styles/home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/useServices";

export type Status = "Active" | "Inactive" | "Pending" | "Blacklisted";
export type Gender = "male" | "female";
export type MaritalStatus = "single" | "married";
export type Residence = "Parent Apartment" | "Rented Apartment" | "Owned Home";
export interface Education {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officialEmail: string;
  monthlyIncome: number;
  loan: number;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  email: string;
  phoneNumber: number;
  relationShip: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  bvn: number;
  gender: Gender;
  maritalStatus: MaritalStatus;
  children: number;
  residence?: Residence;
  status: Status;
  education?: Education;
  socials?: Socials;
  guarantor?: Guarantor[];
}

const UsersPage = () => {
  const { data, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
  console.log("DATA===>", data);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.statsGrid}>
        <UserStatsCard
          title="USERS"
          value="2,453"
          icon={<Users className="h-5 w-5 text-[#DF18FF]" />}
          iconBgColor="#F9F1FF"
        />
        <UserStatsCard
          title="ACTIVE USERS"
          value="2,453"
          icon={<Users2 className="h-5 w-5 text-[#5718FF]" />}
          iconBgColor="#EFF2FF"
        />
        <UserStatsCard
          title="USERS WITH LOANS"
          value="12,453"
          icon={<DatabaseIcon className="h-5 w-5 text-[#F55F44]" />}
          iconBgColor="#FEEFEC"
        />
        <UserStatsCard
          title="USERS WITH SAVINGS"
          value="102,453"
          icon={<PiggyBank className="h-5 w-5 text-[#FF3366]" />}
          iconBgColor="#FDF7E8"
        />
      </div>

      <UsersTable users={data ?? []} loading={isLoading} />
    </div>
  );
};

export default UsersPage;
