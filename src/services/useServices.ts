//import { User } from "@/app/(main)/home/page";
import { User } from "@/app/(main)/users/page";
import axios from "axios";
//import { User } from '@/pages/UsersPage';

const USERS_API_URL =
  "https://run.mocky.io/v3/d0554e40-06f4-4fba-b995-859380a27a8b";
// "https://run.mocky.io/v3/bd073628-1f33-417a-9c95-f394e81532c6";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(USERS_API_URL);

    let data: any[] = [];

    if (Array.isArray(response.data)) {
      data = response.data;
    } else if (response.data && typeof response.data === "object") {
      const possibleArrays = Object.values(response.data).filter((val) =>
        Array.isArray(val)
      );
      if (possibleArrays.length > 0) {
        data = possibleArrays[0] as any[];
      }
    }

    if (data.length === 0) {
      throw new Error("No user data found in the response");
    }

    return data.map((user: User, index: number) => ({
      id: `user-${index + 1}`,
      organization: user.organization,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateJoined: user.dateJoined,
      status: user.status || (Math.random() > 0.5 ? "Active" : "Inactive"),
      bvn: user.bvn,
      gender: user.gender || "Not specified",
      maritalStatus: user.maritalStatus || "Unknown",
      children: user.children || 0,
      residence: user?.residence,
      education: user?.education,
      socials: user?.socials,
      guarantor: user?.guarantor,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
