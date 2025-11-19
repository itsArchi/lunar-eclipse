import { Field, FieldProps } from "formik";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface Props {
    name?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function FormikDatePicker({
    name = "dateOfBirth",
    label = "Date of birth",
    placeholder = "Select your date of birth",
    required = false,
    className = "",
}: Props) {
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
                const initialValue = field.value ? dayjs(field.value) : null;

                const handleChange = (date: Dayjs | null) => {
                    const iso = date ? date.toISOString() : null;
                    form.setFieldValue(name, iso);
                    form.setFieldTouched(name, true);
                };

                return (
                    <div className={className}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            {label}
                            {required ? (
                                <span className="text-red-500"> *</span>
                            ) : null}
                        </label>

                        <DatePicker
                            value={initialValue}
                            onChange={(d) => handleChange(d as Dayjs | null)}
                            format="DD MMM YYYY"
                            placeholder={placeholder}
                            allowClear
                            inputReadOnly={true}
                            className="custom-datepicker w-full"
                        />

                        {meta.touched && meta.error ? (
                            <p className="text-red-500 text-sm mt-1">
                                {meta.error as string}
                            </p>
                        ) : null}
                    </div>
                );
            }}
        </Field>
    );
}
