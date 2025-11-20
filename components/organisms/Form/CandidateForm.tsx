import { Formik, Form, Field, FieldProps } from "formik";
import { Input } from "../../atoms/Input/Input";
import * as yup from "yup";
import { Button } from "../../atoms/Button/Button";
import { getAllRegencies } from "../../../utils/domicilesItems/domicilesItems";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { InputSelect, PhoneInput } from "../../atoms/InputSelect/InputSelect";
import DatePicker from "../../molecules/DatePicker/DatePicker";
import RadioButton from "../../atoms/RadioButton/RadioButton";

interface FormValues {
    name: string;
    dateOfBirth: string;
    pronoun: string;
    email: string;
    phone: string;
    linkedin: string;
    domicile: string;
    religion: string;
    salary: string;
}

const CandidateSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    pronoun: yup.string().required("Pronoun is required"),
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^\+628[0-9]{8,12}$/, "Phone number must start with +62 and 8")
        .required("Phone number is required"),
    linkedin: yup
        .string()
        .url("LinkedIn URL is not valid")
        .required("LinkedIn URL is required"),
    domicile: yup.string().required("Domicile is required"),
    religion: yup.string().required("Religion is required"),
    salary: yup.string().required("Expetation Salary is required"),
});

interface CandidateFormProps {
    jobId?: string;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ jobId }) => {
    const [items, setItems] = useState<{ id: string; label: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDomicile, setSelectedDomicile] = useState("");
    const formik = useFormikContext<FormValues>();

    const handleDomicileSelect = (item: { id: string; label: string }) => {
        setSelectedDomicile(item.label);
        formik.setFieldValue("domicile", item.id);
        setSearchTerm("");
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        let mounted = true;
        getAllRegencies().then((data) => {
            if (mounted) {
                const formattedData = data.map((item: any) => ({
                    id: item.id,
                    label: `${item.name} - ${item.province_name}`,
                }));
                setItems(formattedData);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const response = await fetch("/api/applicants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    job_id: jobId,
                    status: "applied",
                    applied_at: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }

            const result = await response.json();
            alert("Application submitted successfully!");
            // Optionally reset the form
            // formik.resetForm();
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Formik<FormValues>
                initialValues={{
                    name: "",
                    dateOfBirth: "",
                    pronoun: "",
                    email: "",
                    phone: "",
                    linkedin: "",
                    domicile: "",
                    religion: "",
                    salary: "",
                }}
                validationSchema={CandidateSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4 max-w-[696px] mb-8 w-full space-y-4 font-nunito">
                        <div className="space-y-4">
                            <Field name="name">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-danger-main text-12 mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <DatePicker
                                name="dateOfBirth"
                                required
                                placeholder="Select your date of birth"
                            />

                            <RadioButton
                                name="pronoun"
                                label="Pronoun (gender)"
                                required
                                options={[
                                    { id: "she", label: "She/her (Female)" },
                                    { id: "he", label: "He/him (Male)" },
                                ]}
                            />

                            <Field name="domicile">
                                {({ field, meta, form }: FieldProps) => {
                                    const handleDomicileSelect = (item: {
                                        id: string;
                                        label: string;
                                    }) => {
                                        setSelectedDomicile(item.label);
                                        form.setFieldValue("domicile", item.id);
                                        setSearchTerm("");
                                        setIsDropdownOpen(false);
                                    };

                                    return (
                                        <div className="relative">
                                            <label className="block text-12 font-400 text-neutral-90 mb-1">
                                                Domicile{" "}
                                                <span className="text-danger-main">
                                                    *
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={
                                                        searchTerm ||
                                                        selectedDomicile
                                                    }
                                                    onChange={(e) => {
                                                        setSearchTerm(
                                                            e.target.value
                                                        );
                                                        setIsDropdownOpen(true);
                                                    }}
                                                    onFocus={() => {
                                                        setIsDropdownOpen(true);
                                                        setSearchTerm("");
                                                    }}
                                                    onBlur={() =>
                                                        setTimeout(
                                                            () =>
                                                                setIsDropdownOpen(
                                                                    false
                                                                ),
                                                            200
                                                        )
                                                    }
                                                    placeholder="Search your domicile..."
                                                    className="w-full text-14 font-nunito text-neutral-30 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {isDropdownOpen && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                        {items
                                                            .filter((item) =>
                                                                item.label
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        searchTerm.toLowerCase()
                                                                    )
                                                            )
                                                            .map((item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                                                        field.value ===
                                                                        item.id
                                                                            ? "bg-blue-50"
                                                                            : ""
                                                                    }`}
                                                                    onMouseDown={() =>
                                                                        handleDomicileSelect(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                            {meta.touched && meta.error && (
                                                <p className="text-danger-main text-sm mt-1">
                                                    {meta.error}
                                                </p>
                                            )}
                                        </div>
                                    );
                                }}
                            </Field>

                            <Field name="email">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Email"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-red-500 text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="phone">
                                {({ field, meta, form }: FieldProps) => (
                                    <div>
                                        <PhoneInput
                                            name="phone"
                                            label="Phone Number"
                                            required
                                            value={field.value || ""}
                                            onChange={(value) => {
                                                form.setFieldValue(
                                                    "phone",
                                                    value
                                                );
                                                form.setFieldTouched(
                                                    "phone",
                                                    true
                                                );
                                            }}
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-red-500 text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="religion">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Religion"
                                            placeholder="Enter your religion"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-red-500 text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="linkedin">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Link LinkedIn"
                                            placeholder="https://linkedin.com/in/username"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-red-500 text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="salary">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Expetation Salary"
                                            placeholder="Enter your expetation"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-red-500 text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>
                        </div>

                        <Button type="primary" isDisabled={isSubmitting}>
                            {isSubmitting ? "Memproses..." : "Submit"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CandidateForm;
