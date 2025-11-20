import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
    it("renders button with correct text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByText("Click me"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when isDisabled is true", () => {
        render(<Button isDisabled>Click me</Button>);
        expect(screen.getByText("Click me")).toBeDisabled();
    });

    it("applies custom className", () => {
        render(<Button className="custom-class">Click me</Button>);
        expect(screen.getByText("Click me")).toHaveClass("custom-class");
    });
});
