import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/context/auth-provider";
import LoginPage from "@/app/(auth)/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/context/auth-provider", () => ({
  useUser: jest.fn(),
}));

describe("LoginPage", () => {
  const pushMock = jest.fn();
  const setUserMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: pushMock });
    (useUser as jest.Mock).mockReturnValue({ setUser: setUserMock });
  });

  it("renders login form inputs", () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(<LoginPage />);

    expect(
      screen.getByPlaceholderText("subscribeto@lendsqr.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("****")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("shows email validation error for invalid email", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("subscribeto@lendsqr.com"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("****"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("submits form with valid inputs and calls mutation", async () => {
    const mutateMock = jest.fn((data, { onSuccess }) =>
      onSuccess({
        data: {
          message: "Login successful",
          loginUser: {
            name: "Isaac",
            email: "isaac@lendsqr.com",
            isEmailVerified: true,
          },
        },
      })
    );

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("subscribeto@lendsqr.com"), {
      target: { value: "isaac@lendsqr.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("****"), {
      target: { value: "validPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        {
          email: "isaac@lendsqr.com",
          password: "validPassword",
        },
        expect.any(Object)
      );
      expect(toast.success).toHaveBeenCalledWith("Login successful");
      expect(setUserMock).toHaveBeenCalledWith({
        name: "Isaac",
        email: "isaac@lendsqr.com",
        isEmailVerified: true,
      });
      expect(pushMock).toHaveBeenCalledWith("/home");
    });
  });

  it("shows error toast on mutation error", async () => {
    const mutateMock = jest.fn((data, { onError }) =>
      onError({ message: "Invalid credentials" })
    );

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("subscribeto@lendsqr.com"), {
      target: { value: "isaac@lendsqr.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("****"), {
      target: { value: "wrongPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
