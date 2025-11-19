import React, { ReactNode, useEffect } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    className?: string;
}

export default function ModalSimple({
    open,
    onClose,
    children,
    title,
    className = "",
}: Props) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden
            />
            <div
                className={`relative bg-neutral-10 rounded-lg shadow-lg w-[90%] max-w-2xl p-4 z-10 ${className}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-semibold text-neutral-100">
                        {title}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-70 px-2 py-1"
                    >
                        ✕
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}
