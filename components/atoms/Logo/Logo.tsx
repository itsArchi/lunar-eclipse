import clsx from "clsx";
import Image from "next/image";
import logo from "../../../public/assets/image/Logo.svg";

interface LogoProps {
    type?: "default" | "imageText" | "text";
    size?: "sm" | "md" | "lg";
}
export const Logo = ({ type = "default", size = "md" }: LogoProps) => {
    const imageContainerSize = clsx({
        "w-32 h-8": type === "default" && size === "sm",
        "w-32 h-8 mr-2": type === "imageText" && size === "sm",
        "w-40 h-14": type === "default" && size === "md",
        "w-40 h-14 mr-2": type === "imageText" && size === "md",
        "w-60 h-16": type === "default" && size === "lg",
        "w-60 h-16 mr-2": type === "imageText" && size === "lg",
    });

    const baseImageContainer = `relative block ${imageContainerSize}`;

    return (
        <div className="flex items-center">
            {(type === "default" || type === "imageText") && (
                <div className={baseImageContainer}>
                    <Image src={logo} alt=" logo" width={140} height={140} />
                </div>
            )}
        </div>
    );
};
