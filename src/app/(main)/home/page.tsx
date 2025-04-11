"use client";
import React from "react";
import { Users, Users2, PiggyBank, DatabaseIcon } from "lucide-react";
import UsersTable from "../_components/common/UsersTable";
import UserStatsCard from "../_components/common/UserStatsCard";

import styles from "../../styles/home.module.scss";
//import styles from "../../../styles/home.module.scss";
const mockUsers = [
  {
    organization: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "May 15, 2020 10:00 AM",
    status: "Inactive" as const,
  },
  {
    organization: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phoneNumber: "08160780928",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Pending" as const,
  },
  {
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted" as const,
  },
  {
    organization: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "07003309226",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Pending" as const,
  },
  {
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Active" as const,
  },
  {
    organization: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08060780900",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Active" as const,
  },
  {
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted" as const,
  },
  {
    organization: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08060780900",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Inactive" as const,
  },
  {
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Inactive" as const,
  },
];

const Home = () => {
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

      <UsersTable users={mockUsers} />
    </div>
  );
};

export default Home;
