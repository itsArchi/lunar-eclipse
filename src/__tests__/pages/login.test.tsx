import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import LoginPage from "../../../pages/login";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

describe("LoginPage", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders login form", () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /masuk/i })
        ).toBeInTheDocument();
    });

    it("validates required fields", async () => {
        render(<LoginPage />);
        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        await waitFor(() => {
            expect(screen.getByText(/email wajib diisi/i)).toBeInTheDocument();
            expect(
                screen.getByText(/password wajib diisi/i)
            ).toBeInTheDocument();
        });
    });

    it("submits the form with valid data", async () => {
        (signIn as jest.Mock).mockResolvedValueOnce({
            error: null,
            url: "/dashboard",
        });

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("credentials", {
                email: "test@example.com",
                password: "password123",
                redirect: false,
            });
        });
    });
});
