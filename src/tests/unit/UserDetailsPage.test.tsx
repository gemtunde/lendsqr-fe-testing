import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { useUserStorage } from "@/hooks/useUserStorage";
import { toast } from "sonner";
import UserDetailsPage from "@/app/(main)/users/[id]/page";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useUserStorage", () => ({
  useUserStorage: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

const mockPush = jest.fn();

const mockUser = {
  id: "123",
  username: "John Doe",
  email: "john@example.com",
  phoneNumber: "1234567890",
  bvn: 1234567890,
  gender: "male",
  maritalStatus: "single",
  children: 0,
  residence: "Rented Apartment",
  accountBalance: 120000,
  accountNumber: 1234567890,
  bankName: "GTBank",
  status: "Active",
  education: {
    level: "Bachelors",
    employmentStatus: "Employed",
    sector: "Tech",
    duration: "2 years",
    officialEmail: "john.work@example.com",
    monthlyIncome: 250000,
    loan: 50000,
  },
  socials: {
    twitter: "@johndoe",
    facebook: "johndoe.fb",
    instagram: "johndoe.ig",
  },
  guarantor: [
    {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: 9876543210,
      relationShip: "Sister",
    },
  ],
};

describe("UserDetailsPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useUserStorage as jest.Mock).mockReturnValue({
      getUser: jest.fn().mockReturnValue(mockUser),
    });
  });

  it("renders user details correctly", async () => {
    render(<UserDetailsPage />);
    expect(screen.getByText("Loading user details...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
    });
  });

  it("handles missing user with toast error and shows fallback message", async () => {
    (useUserStorage as jest.Mock).mockReturnValue({
      getUser: jest.fn().mockReturnValue(null),
    });

    render(<UserDetailsPage />);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(screen.getByText("User Not Found")).toBeInTheDocument();
    });
  });

  it("allows switching tabs", async () => {
    render(<UserDetailsPage />);
    await waitFor(() => screen.getByText("General Details"));

    fireEvent.click(screen.getByText("Documents"));
    expect(
      screen.getByText("Documents information will be available soon.")
    ).toBeInTheDocument();
  });

  it("handles Activate and Blacklist actions", async () => {
    render(<UserDetailsPage />);
    await waitFor(() => screen.getByText("User Details"));

    fireEvent.click(screen.getByText("BLACKLIST USER"));
    expect(
      screen.getByText("User has been successfully blacklisted.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("ACTIVATE USER"));
    expect(
      screen.getByText("User has been successfully activated.")
    ).toBeInTheDocument();
  });
});
