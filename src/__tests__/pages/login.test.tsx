import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoginPage from "../../../pages/login";
import { useAuthStore } from "../../../src/store/authStore";
import "@testing-library/jest-dom";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock("../../../src/store/authStore", () => ({
    useAuthStore: jest.fn(),
}));

describe("LoginPage", () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuthStore as unknown as jest.Mock).mockImplementation(
            (selector) => {
                return selector({
                    login: mockLogin,
                });
            }
        );
    });

    it("renders login form with all required elements", () => {
        render(<LoginPage />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /masuk/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/belum punya akun\?/i)).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /daftar disini/i })
        ).toHaveAttribute("href", "/register");
    });

    it("validates form inputs", async () => {
        render(<LoginPage />);

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        expect(
            await screen.findByText("Email wajib diisi")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Password wajib diisi")
        ).toBeInTheDocument();

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "invalid-email" },
        });

        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        expect(
            await screen.findByText("Email tidak valid")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Minimal 6 karakter")
        ).toBeInTheDocument();
    });

    it("handles successful login", async () => {
        mockLogin.mockResolvedValueOnce({ success: true });

        render(<LoginPage />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        expect(screen.getByRole("button", { name: /masuk/i })).toBeDisabled();

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith(
                "test@example.com",
                "password123"
            );
            expect(mockPush).toHaveBeenCalledWith("/job-list");
        });
    });

    it("handles login error", async () => {
        const errorMessage = "Invalid credentials";
        mockLogin.mockResolvedValueOnce({
            success: false,
            error: errorMessage,
        });

        render(<LoginPage />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "wrongpassword" },
        });

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });

    it("handles unexpected errors", async () => {
        mockLogin.mockRejectedValueOnce(new Error("Network error"));

        render(<LoginPage />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        expect(
            await screen.findByText("An error occurred during login")
        ).toBeInTheDocument();
    });
});
