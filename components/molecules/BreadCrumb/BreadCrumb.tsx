import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface BreadcrumbProps {
    // map path segment to a prettier label, e.g. { "job-list": "Job List", "[id]": "Manage Candidate" }
    dynamicLabels?: Record<string, string>;
    className?: string;
}

const Chevron = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
    >
        <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const formatLabel = (seg: string, dynamicLabels?: Record<string, string>) => {
    if (!seg) return "";
    // If a dynamic label exists for this segment, use it
    if (dynamicLabels && dynamicLabels[seg]) return dynamicLabels[seg];

    // Common conversions
    // remove file extension or query-like parts (defensive)
    const cleaned = seg.replace(/\.[^/.]+$/, "");
    // replace hyphen/underscore and capitalize words
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
    const asPath = router.asPath.split("?")[0].split("#")[0]; // ignore query/hash
    const segments = asPath === "/" ? [""] : asPath.split("/").filter(Boolean);

    // Build incremental hrefs: e.g. ["job-list","123"] => ["/job-list","/job-list/123"]
    const crumbs = segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        return { seg, href };
    });

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-3 ${className}`}
        >
            {/* First pill (home / root) - optional: show Job List if root is job-list route */}
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
                                <span className="text-neutral-40">
                                    <Chevron />
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
