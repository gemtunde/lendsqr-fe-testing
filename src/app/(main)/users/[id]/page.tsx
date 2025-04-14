"use client";

import { ChevronLeft, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./userId.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useUserStorage } from "@/hooks/useUserStorage";
import { useEffect, useState } from "react";
import { User } from "../page";
import {
  formatAmountWithCurrency,
  getInitials,
  getStars,
} from "@/utils/helper";
import { toast } from "sonner";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getUser } = useUserStorage();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (!id) {
      router.push("/users");
      return;
    }

    //  get the user from local storage
    const storedUser = getUser(id);
    if (storedUser) {
      setUser(storedUser);
    } else {
      toast.error("We couldn't find details for this user.");
    }
    setLoading(false);
  }, [id, getUser, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading user details...</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: "Active" | "Blacklisted") => {
    if (user) {
      const updatedUser = { ...user, status: newStatus };
      setUser(updatedUser);

      toast(
        `User has been successfully ${newStatus === "Blacklisted" ? "blacklisted" : "activated"}.`
      );
    }
  };

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <h2>User Not Found</h2>
        <p>We couldn't find the user you're looking for.</p>
        <Button onClick={() => router.push("/users")}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => router.push("/users")}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Users</span>
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <Button
            variant="outline"
            className={styles.activateButton}
            onClick={() => handleStatusChange("Active")}
          >
            ACTIVATE USER
          </Button>

          <Button
            variant="outline"
            className={styles.blacklistButton}
            onClick={() => handleStatusChange("Blacklisted")}
          >
            BLACKLIST USER
          </Button>
        </div>
      </div>

      <div className={styles.userProfileCard}>
        <CardContent className={styles.userProfileContent}>
          <div className={styles.userProfileHeader}>
            <div className={styles.userAvatar}>
              <UserIcon className="h-10 w-10" />
            </div>
            <div className={styles.userBasicInfo}>
              <h2 className={styles.userName}>{user.username}</h2>
              <p className={styles.userCode}>{user.id}</p>
            </div>
            <div className={styles.userTier}>
              <p>User's Tier</p>
              <div className={styles.stars}>{getStars(4)}</div>
            </div>
            <div className={styles.userBalance}>
              <h3>{user.accountBalance || "₦0.00"}</h3>
              <p>
                {user.accountNumber || "No account"}/
                {user.bankName || "No bank"}
              </p>
            </div>
          </div>

          <Tabs defaultValue="general" className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger
                value="general"
                className={activeTab === "general" ? styles.activeTab : ""}
                onClick={() => setActiveTab("general")}
              >
                General Details
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className={activeTab === "documents" ? styles.activeTab : ""}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="bank"
                className={activeTab === "bank" ? styles.activeTab : ""}
                onClick={() => setActiveTab("bank")}
              >
                Bank Details
              </TabsTrigger>
              <TabsTrigger
                value="loans"
                className={activeTab === "loans" ? styles.activeTab : ""}
                onClick={() => setActiveTab("loans")}
              >
                Loans
              </TabsTrigger>
              <TabsTrigger
                value="savings"
                className={activeTab === "savings" ? styles.activeTab : ""}
                onClick={() => setActiveTab("savings")}
              >
                Savings
              </TabsTrigger>
              <TabsTrigger
                value="app"
                className={activeTab === "app" ? styles.activeTab : ""}
                onClick={() => setActiveTab("app")}
              >
                App and System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className={styles.tabContent}>
              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <h4>FULL NAME</h4>
                    <p>{user.username}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>PHONE NUMBER</h4>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>EMAIL ADDRESS</h4>
                    <p>{user.email}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>BVN</h4>
                    <p>{user.bvn}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>GENDER</h4>
                    <p>{user.gender === "male" ? "Male" : "Female"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>MARITAL STATUS</h4>
                    <p>
                      {user.maritalStatus === "single" ? "Single" : "Married"}
                    </p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>CHILDREN</h4>
                    <p>{user.children === 0 ? "None" : user.children}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>TYPE OF RESIDENCE</h4>
                    <p>{user.residence}</p>
                  </div>
                </div>
                <hr className={styles.borderLine} />
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>
                  Education and Employment
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <h4>LEVEL OF EDUCATION</h4>
                    <p>{user.education?.level || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>EMPLOYMENT STATUS</h4>
                    <p>{user.education?.employmentStatus || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>SECTOR OF EMPLOYMENT</h4>
                    <p>{user.education?.sector || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>DURATION OF EMPLOYMENT</h4>
                    <p>{user.education?.duration || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>OFFICE EMAIL</h4>
                    <p>{user.education?.officialEmail || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>MONTHLY INCOME</h4>
                    <p>{user.education?.monthlyIncome || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>LOAN REPAYMENT</h4>
                    <p>{user.education?.loan || "N/A"}</p>
                  </div>
                </div>
                <hr className={styles.borderLine} />
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Socials</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <h4>TWITTER</h4>
                    <p>{user.socials?.twitter || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>FACEBOOK</h4>
                    <p>{user.socials?.facebook || "N/A"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>INSTAGRAM</h4>
                    <p>{user.socials?.instagram || "N/A"}</p>
                  </div>
                </div>
                <hr className={styles.borderLine} />
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Guarantor</h3>
                {user.guarantor &&
                  user.guarantor.map((guarantor, index) => (
                    <div key={index} className={styles.guarantorSection}>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <h4>FULL NAME</h4>
                          <p>{guarantor.fullName}</p>
                        </div>
                        <div className={styles.infoItem}>
                          <h4>PHONE NUMBER</h4>
                          <p>{guarantor.phoneNumber}</p>
                        </div>
                        <div className={styles.infoItem}>
                          <h4>EMAIL ADDRESS</h4>
                          <p>{guarantor.email}</p>
                        </div>
                        <div className={styles.infoItem}>
                          <h4>RELATIONSHIP</h4>
                          <p>{guarantor.relationShip}</p>
                        </div>
                      </div>
                      {/* {index < user.guarantor.length - 1 && <div className={styles.guarantorDivider} />} */}
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className={styles.emptyTab}>
                <p>Documents information will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="bank">
              <div className={styles.emptyTab}>
                <p>Bank details information will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="loans">
              <div className={styles.emptyTab}>
                <p>Loans information will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="savings">
              <div className={styles.emptyTab}>
                <p>Savings information will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="app">
              <div className={styles.emptyTab}>
                <p>App and System information will be available soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </div>
  );
}
