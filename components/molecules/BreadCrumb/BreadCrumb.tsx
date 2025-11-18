import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ChevronIcon from "../../../public/assets/icon/Chevron";

interface BreadcrumbProps {
    dynamicLabels?: Record<string, string>;
    className?: string;
}

const formatLabel = (seg: string, dynamicLabels?: Record<string, string>) => {
    if (!seg) return "";
    if (dynamicLabels && dynamicLabels[seg]) return dynamicLabels[seg];

    const cleaned = seg.replace(/\.[^/.]+$/, "");
    return cleaned
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    dynamicLabels = {},
    className = "",
}) => {
    const router = useRouter();
    const asPath = router.asPath.split("?")[0].split("#")[0];
    const segments = asPath === "/" ? [""] : asPath.split("/").filter(Boolean);

    const crumbs = segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        return { seg, href };
    });

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-3 ${className}`}
        >
            <div className="inline-flex items-center gap-2">
                {crumbs.length === 0 ? null : null}
            </div>

            <div className="flex items-center gap-2">
                {crumbs.map((c, i) => {
                    const isLast = i === crumbs.length - 1;
                    const label = formatLabel(c.seg, dynamicLabels);

                    return (
                        <div key={c.href} className="flex items-center gap-2">
                            <Link
                                href={c.href}
                                className={`inline-flex items-center px-4 py-1 rounded-lg text-14 font-700 leading-24 text-neutral-100 border ${
                                    isLast
                                        ? "text-neutral-10 border-neutral-40"
                                        : "bg-white text-neutral-70 border-neutral-50"
                                }`}
                            >
                                {label}
                            </Link>

                            {!isLast && (
                                <span className="text-neutral-100">
                                    <ChevronIcon />
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumb;
