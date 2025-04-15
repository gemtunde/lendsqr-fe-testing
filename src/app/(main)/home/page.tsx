"use client";
import React from "react";
import { Users, Users2, PiggyBank, DatabaseIcon } from "lucide-react";
import UsersTable from "../_components/common/UsersTable";
import UserStatsCard from "../_components/common/UserStatsCard";
import { useQuery } from "@tanstack/react-query";
import styles from "./home.module.scss";
import { fetchUsers } from "@/services/useServices";
import { User } from "../users/page";

const Home = () => {
  const { data, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });

  console.log("Data from API:", data);
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

export default Home;
