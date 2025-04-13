import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/(auth)/page";
import userEvent from "@testing-library/user-event";

describe("LoginPage", () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  it("renders all required UI elements", () => {
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  // Positive scenario
  it("submits form with valid email and password", () => {
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    const form = emailInput.closest("form")!;
    const preventDefault = jest.fn();

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.submit(form, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  // Negative scenario: Empty email
  it("prevents form submission with empty email", () => {
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    const form = passwordInput.closest("form")!;
    const preventDefault = jest.fn();

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(form, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(
      screen.getByPlaceholderText("Email").getAttribute("required")
    ).toBeTruthy();
  });

  // Negative scenario: Empty password
  it("prevents form submission with empty password", () => {
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const form = emailInput.closest("form")!;
    const preventDefault = jest.fn();

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.submit(form, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(
      screen.getByPlaceholderText("Password").getAttribute("required")
    ).toBeTruthy();
  });

  // Negative scenario: Invalid email format (simple check since native validation handles it)
  it("rejects invalid email format using browser validation", async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;

    await user.type(emailInput, "invalid-email");
    expect(emailInput.checkValidity()).toBe(false);
  });
});
