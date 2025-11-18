import { forwardRef } from "react";

interface SquareCheckIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SquareCheckIcon = forwardRef<HTMLInputElement, SquareCheckIconProps>(
    ({ checked = false, className = "", ...props }, ref) => {
        return (
            <div
                className={`relative w-5 h-5 flex items-center justify-center ${className}`}
            >
                <input
                    type="checkbox"
                    ref={ref}
                    checked={checked}
                    className={`
                        appearance-none w-5 h-5 rounded border-2 border-neutral-30
                        focus:ring-2 focus:ring-primary-main focus:ring-offset-2
                        focus:outline-none transition-colors cursor-pointer
                        ${
                            checked
                                ? "bg-primary-main border-primary-main"
                                : "bg-white hover:border-primary-main"
                        }
                    `}
                    {...props}
                />
                {checked && (
                    <svg
                        className="absolute w-3.5 h-3.5 text-white pointer-events-none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
        );
    }
);

SquareCheckIcon.displayName = "SquareCheckIcon";

export default SquareCheckIcon;
