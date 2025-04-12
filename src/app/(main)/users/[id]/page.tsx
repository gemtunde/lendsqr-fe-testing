import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./userId.module.scss";

export async function generateStaticParams() {
  // For demonstration purposes, we'll pre-render pages for a few sample user IDs
  return [{ id: "123" }, { id: "456" }, { id: "789" }];
}

export default function UserDetailsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/dashboard/users" className={styles.backLink}>
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
                <AvatarImage src="/placeholder-avatar.jpg" alt="Grace Effiom" />
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className={styles.userMeta}>
                <h2 className={styles.userName}>Grace Effiom</h2>
                <p className={styles.userId}>LSQFf587e90</p>
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
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>FULL NAME</label>
                <p>Grace Effiom</p>
              </div>
              <div className={styles.field}>
                <label>PHONE NUMBER</label>
                <p>07060780922</p>
              </div>
              <div className={styles.field}>
                <label>EMAIL ADDRESS</label>
                <p>grace@gmail.com</p>
              </div>
              <div className={styles.field}>
                <label>BVN</label>
                <p>07060780922</p>
              </div>
              <div className={styles.field}>
                <label>GENDER</label>
                <p>Female</p>
              </div>
              <div className={styles.field}>
                <label>MARITAL STATUS</label>
                <p>Single</p>
              </div>
              <div className={styles.field}>
                <label>CHILDREN</label>
                <p>None</p>
              </div>
              <div className={styles.field}>
                <label>TYPE OF RESIDENCE</label>
                <p>Parent's Apartment</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Education and Employment</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>LEVEL OF EDUCATION</label>
                <p>B.Sc</p>
              </div>
              <div className={styles.field}>
                <label>EMPLOYMENT STATUS</label>
                <p>Employed</p>
              </div>
              <div className={styles.field}>
                <label>SECTOR OF EMPLOYMENT</label>
                <p>FinTech</p>
              </div>
              <div className={styles.field}>
                <label>DURATION OF EMPLOYMENT</label>
                <p>2 years</p>
              </div>
              <div className={styles.field}>
                <label>OFFICE EMAIL</label>
                <p>grace@lendsqr.com</p>
              </div>
              <div className={styles.field}>
                <label>MONTHLY INCOME</label>
                <p>₦200,000.00 - ₦400,000.00</p>
              </div>
              <div className={styles.field}>
                <label>LOAN REPAYMENT</label>
                <p>40,000</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Socials</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>TWITTER</label>
                <p>@grace_effiom</p>
              </div>
              <div className={styles.field}>
                <label>FACEBOOK</label>
                <p>Grace Effiom</p>
              </div>
              <div className={styles.field}>
                <label>INSTAGRAM</label>
                <p>@grace_effiom</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Guarantor</CardTitle>
            </CardHeader>
            <CardContent className={styles.grid}>
              <div className={styles.field}>
                <label>FULL NAME</label>
                <p>Debby Ogana</p>
              </div>
              <div className={styles.field}>
                <label>PHONE NUMBER</label>
                <p>07060780922</p>
              </div>
              <div className={styles.field}>
                <label>EMAIL ADDRESS</label>
                <p>debby@gmail.com</p>
              </div>
              <div className={styles.field}>
                <label>RELATIONSHIP</label>
                <p>Sister</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
