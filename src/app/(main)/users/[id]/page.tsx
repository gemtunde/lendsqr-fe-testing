"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./userId.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useUserStorage } from "@/hooks/useUserStorage";
import { useEffect, useState } from "react";
import { User } from "../page";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  //const navigate = useNavigate();
  const { getUser } = useUserStorage();
  // const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      //   toast({
      //     title: "User not found",
      //     description: "We couldn't find details for this user.",
      //     variant: "destructive",
      //   });
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
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/users" className={styles.backLink}>
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Users</span>
          </Link>
          <h1 className={styles.title}>User Details</h1>
        </div>
        <div className={styles.actions}>
          <Button variant="outline" className={styles.blacklistButton}>
            BLACKLIST USER
          </Button>
          <Button variant="outline" className={styles.activateButton}>
            ACTIVATE USER
          </Button>
        </div>
      </div>

      <Card className={styles.userCard}>
        <CardContent>
          <div className={styles.userInfo}>
            <div className={styles.userProfile}>
              <Avatar className={styles.avatar}>
                <AvatarImage
                  src="/placeholder-avatar.jpg"
                  alt={user?.username || "N/A"}
                />
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className={styles.userMeta}>
                <h2 className={styles.userName}>{user.username || "N/A"}</h2>
                <p className={styles.userId}> {user?.id || "N/A"}</p>
              </div>
            </div>
            <div className={styles.userTier}>
              <p>User's Tier</p>
              <div className={styles.stars}>⭐️☆☆</div>
            </div>
            <div className={styles.userBalance}>
              <h3>₦200,000.00</h3>
              <p>9912345678/Providus Bank</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className={styles.tabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="general">General Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="app">App and System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className={styles.tabContent}>
          <div className={styles.cardContainer}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>FULL NAME</label>
                <p>{user?.username || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>PHONE NUMBER</label>
                <p>{user?.phoneNumber || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>EMAIL ADDRESS</label>
                <p>{user?.email || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>BVN</label>
                <p>{user?.bvn || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>GENDER</label>
                <p>{user?.gender || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>MARITAL STATUS</label>
                <p>{user?.maritalStatus || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>CHILDREN</label>
                <p>{user?.children || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>TYPE OF RESIDENCE</label>
                <p>{user?.residence || "N/A"}</p>
              </div>
            </CardContent>
          </div>

          <div className={styles.cardContainer}>
            <CardHeader>
              <CardTitle>Education and Employment</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>LEVEL OF EDUCATION</label>
                <p>{user?.education?.level || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>EMPLOYMENT STATUS</label>
                <p>{user?.education?.employmentStatus || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>SECTOR OF EMPLOYMENT</label>
                <p>{user?.education?.sector || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>DURATION OF EMPLOYMENT</label>
                <p>{user?.education?.duration || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>OFFICE EMAIL</label>
                <p>{user?.education?.officialEmail || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>MONTHLY INCOME</label>
                <p>{user?.education?.monthlyIncome || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>LOAN REPAYMENT</label>
                <p>{user?.education?.loan || "N/A"}</p>
              </div>
            </CardContent>
          </div>

          <div className={styles.cardContainer}>
            <CardHeader>
              <CardTitle>Socials</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>TWITTER</label>
                <p>{user?.socials?.twitter || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>FACEBOOK</label>
                <p>{user?.socials?.facebook || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>INSTAGRAM</label>
                <p>{user?.socials?.instagram || "N/A"}</p>
              </div>
            </CardContent>
          </div>

          <div className={styles.cardContainer}>
            <CardHeader>
              <CardTitle>Guarantor</CardTitle>
            </CardHeader>
            {user?.guarantor?.map((person, index) => (
              <CardContent className={styles.grid} key={index}>
                <div className={styles.field}>
                  <label>FULL NAME</label>
                  <p>{person?.fullName || "N/A"}</p>
                </div>
                <div className={styles.field}>
                  <label>PHONE NUMBER</label>
                  <p>{person?.phoneNumber || "N/A"}</p>
                </div>
                <div className={styles.field}>
                  <label>EMAIL ADDRESS</label>
                  <p>{person?.email || "N/A"}</p>
                </div>
                <div className={styles.field}>
                  <label>RELATIONSHIP</label>
                  <p>{person?.relationShip || "N/A"}</p>
                </div>
              </CardContent>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
