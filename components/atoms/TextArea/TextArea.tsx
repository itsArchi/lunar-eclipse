import * as React from "react";

import clsx from "clsx";

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, required, ...props }, ref) => {
        return (
            <div>
                <div className="flex mb-1">
                    <label className="text-12 leading-20 font-400 text-neutral-90">
                        {label}
                    </label>
                    {required && <label className="text-danger-main">*</label>}
                </div>
                <textarea
                    className={clsx(
                        "flex min-h-[80px] w-full rounded-md border-2 border-neutral-40 border-input px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
