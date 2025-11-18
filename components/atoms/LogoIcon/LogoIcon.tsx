import clsx from "clsx";
import Image from "next/image";
import logoIcon from "../../../public/assets/image/LogoIcon.png";

interface LogoIconProps {
    type?: "default" | "imageText" | "text";
    size?: "sm" | "md" | "lg";
}
export const LogoIcon = ({ type = "default", size = "md" }: LogoIconProps) => {
    const imageContainerSize = clsx({
        "w-12 h-12": type === "default" && size === "sm",
        "w-16 h-16": type === "default" && size === "md",
        "w-20 h-20": type === "default" && size === "lg",
    });

    const baseImageContainer = `relative block ${imageContainerSize}`;

    return (
        <div className="flex items-center">
            {type === "default" && (
                <div className={baseImageContainer}>
                    <Image src={logoIcon} alt=" logo" width={56} height={56} />
                </div>
            )}
        </div>
    );
};
