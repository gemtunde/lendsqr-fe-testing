//import { User } from "@/app/(main)/home/page";
import { User } from "@/app/(main)/users/page";
import { useState, useCallback, useEffect } from "react";
//import type { User } from '@/pages/UsersPage';

export const useUserStorage = () => {
  const [storedUsers, setStoredUsers] = useState<Record<string, User>>({});

  // Load stored users from localStorage on initial render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("users");
      if (storedData) {
        setStoredUsers(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load users from localStorage:", error);
    }
  }, []);

  // Save user to localStorage
  const saveUser = useCallback((user: User) => {
    try {
      // Get existing stored users
      const existingData = localStorage.getItem("users");
      const users: Record<string, User> = existingData
        ? JSON.parse(existingData)
        : {};

      // Add/update user
      users[user.id] = user;

      // Save updated users
      localStorage.setItem("users", JSON.stringify(users));

      // Update state
      setStoredUsers(users);

      return true;
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
      return false;
    }
  }, []);

  // Get user from localStorage by id
  const getUser = useCallback((id: string): User | null => {
    try {
      const existingData = localStorage.getItem("users");
      if (!existingData) return null;

      const users: Record<string, User> = JSON.parse(existingData);
      return users[id] || null;
    } catch (error) {
      console.error("Failed to get user from localStorage:", error);
      return null;
    }
  }, []);

  return {
    saveUser,
    getUser,
    storedUsers,
  };
};
