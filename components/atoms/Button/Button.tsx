import clsx from "clsx";
import { MouseEventHandler } from "react";

interface ButtonProps {
    size?: "sm" | "md" | "lg";
    children?: any;
    icon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    type?:
        | "solid"
        | "outline"
        | "primary"
        | "secondary"
        | "danger"
        | "warning"
        | "success";
    buttonType?: "submit" | "button";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    isFullsize?: boolean;
    rounded?: "full" | "md" | "lg";
    className?: string;
}

export const Button = ({
    size = "md",
    rounded = "lg",
    icon,
    suffixIcon,
    type = "primary",
    onClick,
    children,
    isDisabled = false,
    isFullsize = false,
    buttonType = "button",
    className = "",
}: ButtonProps) => {
    const fontStyle = clsx({
        "text-16": size === "lg",
        "text-12": size === "md" || size === "sm",
    });

    const roundedSize = clsx({
        "rounded-full": rounded === "full",
        "rounded-md": rounded !== "full",
        "rounded-lg": rounded === "lg",
    });

    const buttonSize = clsx({
        "h-[38px] py-4 px-5": size === "lg" && children,
        "h-[34px] py-3 px-4": size === "md" && children,
        "h-[32px] px-3 py-2": size === "sm" && children,
        "w-fit h-fit p-3.5 ": size === "lg" && icon && !children,
        "w-fit h-fit p-3": size === "md" && icon && !children,
        "w-fit h-fit p-2": size === "sm" && icon && !children,
    });

    const containerSize = clsx({
        "w-full": isFullsize,
    });

    const buttonColor = clsx({
        "bg-primary-main hover:bg-primary-main text-neutral-10":
            type === "solid" && !isDisabled,
        "bg-primary-main text-neutral-10 opacity-50":
            type === "solid" && isDisabled,
        "bg-transparent border-2 border-primary-main hover:bg-primary-main text-primary-main":
            type === "outline" && !isDisabled,
        "bg-transparent border-2 border-primary-main text-primary-main opacity-50":
            type === "outline" && isDisabled,
        "bg-primary-main text-neutral-10": type === "primary" && !isDisabled,
        // "bg-primary-main text-neutral-10 opacity-50":
        //     type === "primary" && isDisabled,
        "bg-secondary-main text-neutral-100":
            type === "secondary" && !isDisabled,
        "bg-secondary-main text-neutral-100 opacity-50":
            type === "secondary" && isDisabled,
        "bg-danger-main text-neutral-10": type === "danger" && !isDisabled,
        "bg-danger-main text-neutral-10 opacity-50":
            type === "danger" && isDisabled,
        "bg-warning-main text-neutral-10": type === "warning" && !isDisabled,
        "bg-warning-main text-neutral-10 opacity-50":
            type === "warning" && isDisabled,
        "bg-success-main text-neutral-10": type === "success" && !isDisabled,
        "bg-success-main text-neutral-10 opacity-50":
            type === "success" && isDisabled,
    });

    const iconColor = clsx({
        "fill-neutral-20": type === "primary",
        "fill-neutral-90":
            (type === "outline" || type === "secondary") && !isDisabled,
        "fill-neutral-80":
            (type === "outline" || type === "secondary") && isDisabled,
    });

    const iconWidth = clsx({
        "w-[20px] h-[20px] p-0.5": size === "lg",
        "w-[18px] h-[18px] p-0.5": size === "md",
        "w-[16px] h-[16px] p-0.5": size === "sm",
    });

    const iconMargin = clsx({
        "ml-2": size === "lg" && suffixIcon,
        "ml-1.5": size === "md" && suffixIcon,
        "ml-1": size === "sm" && suffixIcon,
        "mr-2": size === "lg" && icon && children,
        "mr-1.5": size === "md" && icon && children,
        "mr-1": size === "sm" && icon && children,
    });

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-inter ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${className} ${containerSize} ${buttonColor} ${fontStyle} ${buttonSize} ${roundedSize}`}
            onClick={onClick}
            type={buttonType}
            disabled={isDisabled}
        >
            {icon && (
                <div className={`${iconWidth} ${iconMargin} ${iconColor}`}>
                    {icon}
                </div>
            )}
            {children}
            {suffixIcon && (
                <div className={`${iconWidth} ${iconMargin} ${iconColor}`}>
                    {suffixIcon}
                </div>
            )}
        </button>
    );
};
