import React from "react";
import { Field, FieldProps } from "formik";

export interface RadioOption {
    id: string | number;
    label: string;
}

interface Props {
    name: string;
    label?: string;
    options: RadioOption[];
    required?: boolean;
    className?: string;
}

export default function RadioButton({
    name,
    label,
    options,
    required = false,
    className = "",
}: Props) {
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
                return (
                    <div className={className}>
                        {label && (
                            <label className="block text-sm font-medium text-neutral-100 mb-2">
                                {label}
                                {required && (
                                    <span className="text-red-500"> *</span>
                                )}
                            </label>
                        )}

                        <div className="flex items-center gap-8">
                            {options.map((opt) => {
                                const checked =
                                    String(field.value) === String(opt.id);

                                return (
                                    <label
                                        key={opt.id}
                                        className="flex items-center cursor-pointer select-none"
                                    >
                                        <input
                                            type="radio"
                                            name={name}
                                            value={opt.id}
                                            checked={checked}
                                            onChange={() =>
                                                form.setFieldValue(name, opt.id)
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(name, true)
                                            }
                                            className="sr-only"
                                        />

                                        <span
                                            className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-2
                        transition-all
                        ${checked ? "border-neutral-90" : "border-neutral-40"}
                      `}
                                        >
                                            <span
                                                className={`
                          w-2.5 h-2.5 rounded-full transition-all
                          ${checked ? "bg-primary-main" : "bg-transparent"}
                        `}
                                            />
                                        </span>

                                        <span className="text-sm text-neutral-90">
                                            {opt.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>

                        {meta.touched && meta.error && (
                            <p className="text-red-500 text-sm mt-2">
                                {meta.error}
                            </p>
                        )}
                    </div>
                );
            }}
        </Field>
    );
}
