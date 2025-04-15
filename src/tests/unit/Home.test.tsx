import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/(main)/users/page";
import Home from "@/app/(main)/home/page";
import UsersTable from "@/app/(main)/_components/common/UsersTable";

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

describe("Home Page", () => {
  const mockUsers: User[] = [
    {
      id: "1",
      email: "john@example.com",
      username: "John",
      dateJoined: "",
      phoneNumber: "",
      organization: "",
      bvn: 0,
      accountBalance: 0,
      accountNumber: 0,
      bankName: "",
      gender: "male",
      maritalStatus: "single",
      children: 0,
      status: "Active",
    },
    {
      id: "2",
      email: "jane@example.com",
      username: "Jane",
      dateJoined: "",
      phoneNumber: "",
      organization: "",
      bvn: 0,
      accountBalance: 0,
      accountNumber: 0,
      bankName: "",
      gender: "male",
      maritalStatus: "single",
      children: 0,
      status: "Active",
    },
  ];

  it("renders the title and stat cards", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<Home />);

    expect(screen.getByText("Users")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("user-stats-card")).toHaveLength(4);
    });
  });

  it("passes users to UsersTable", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });

    expect(UsersTable).toHaveBeenCalledWith(
      expect.objectContaining({ users: mockUsers, loading: false }),
      expect.anything()
    );
  });

  it("shows loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<Home />);

    expect(UsersTable).toHaveBeenCalledWith(
      expect.objectContaining({ loading: true }),
      expect.anything()
    );
  });
});
