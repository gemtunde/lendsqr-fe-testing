import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import UsersPage, { User } from "@/app/(main)/users/page";

// Mocks
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/app/_components/common/UsersTable", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="users-table">UsersTable</div>),
}));

jest.mock("@/app/_components/common/UserStatsCard", () => ({
  __esModule: true,
  default: jest.fn(({ title }: { title: string }) => (
    <div data-testid="user-stats-card">{title}</div>
  )),
}));

describe("UsersPage", () => {
  const mockUsers: User[] = [
    {
      id: "1",
      organization: "Lendsqr",
      username: "john_doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      dateJoined: "2023-01-01",
      bvn: 12345678901,
      accountBalance: 5000,
      accountNumber: 12345678,
      bankName: "Lendsqr Bank",
      gender: "male",
      maritalStatus: "single",
      children: 0,
      status: "Active",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and 4 UserStatsCard components", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<UsersPage />);

    expect(screen.getByText("Users")).toBeInTheDocument();

    await waitFor(() => {
      const statCards = screen.getAllByTestId("user-stats-card");
      expect(statCards).toHaveLength(4);
    });
  });

  it("passes data to UsersTable component", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });

    const usersTable = require("@/app/_components/common/UsersTable").default;
    expect(usersTable).toHaveBeenCalledWith(
      expect.objectContaining({
        users: mockUsers,
        loading: false,
      }),
      expect.anything()
    );
  });

  it("handles loading state correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<UsersPage />);

    const usersTable = require("@/app/_components/common/UsersTable").default;
    expect(usersTable).toHaveBeenCalledWith(
      expect.objectContaining({
        users: [],
        loading: true,
      }),
      expect.anything()
    );
  });
});
