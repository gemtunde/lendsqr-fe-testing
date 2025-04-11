import React from "react";
import styles from "../../../styles/userStatsCard.module.scss";
//import styles from './UserStatsCard.module.scss';

interface UserStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.icon} style={{ backgroundColor: iconBgColor }}>
        {icon}
      </div>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
};

export default UserStatsCard;
