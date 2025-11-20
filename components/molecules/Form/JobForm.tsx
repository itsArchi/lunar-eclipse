import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "../../atoms/Input/Input";
import { InputSelect } from "../../atoms/InputSelect/InputSelect";
import { Textarea } from "../../atoms/TextArea/TextArea";
import { MultiChip } from "../MultiChip/MultiChip";
import axios from "axios";

interface JobFormValues {
    slug: string;
    title: string;
    status: string;
    minSalary: string;
    maxSalary: string;
    currency: string;
    badge: string;
    started_on_text: string;
    cta: string;
}

const JobFormInitialValues: JobFormValues = {
    slug: "",
    title: "",
    status: "active",
    minSalary: "",
    maxSalary: "",
    currency: "IDR",
    badge: "Active",
    started_on_text: "",
    cta: "Manage Job",
};

const JobFormValidationSchema = Yup.object().shape({
    slug: Yup.string().required("Job slug is required"),
    title: Yup.string().required("Job title is required"),
    status: Yup.string().required("Job status is required"),
    minSalary: Yup.string().required("Min salary is required"),
    maxSalary: Yup.string().required("Max salary is required"),
    currency: Yup.string().required("Currency is required"),
    badge: Yup.string().required("Badge is required"),
    started_on_text: Yup.string().required("Start date is required"),
    cta: Yup.string().required("CTA is required"),
});

interface JobFormProps {
    showJobList?: boolean;
    jobData?: Job[];
    onSuccess?: () => void;
    onError?: (error: string) => void;
    formikRef?: React.RefObject<any>;
}

interface Job {
    id: string;
    slug: string;
    title: string;
    status: string;
    salary_range: {
        min: number;
        max: number;
        currency: string;
        display_text: string;
    };
    list_card: {
        badge: string;
        started_on_text: string;
        cta: string;
    };
}

const JobForm = ({
    showJobList = false,
    jobData,
    onSuccess,
    onError,
    formikRef,
}: JobFormProps) => {
    return (
        <div>
            <Formik
                innerRef={formikRef}
                initialValues={JobFormInitialValues}
                validationSchema={JobFormValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const generatedSlug =
                            values.slug ||
                            values.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+|-+$/g, "") ||
                            `job-${Date.now()}`;

                        const newJob = {
                            id: `job_${new Date()
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, "")}_${Math.random()
                                .toString(36)
                                .substr(2, 4)}`,
                            slug: generatedSlug,
                            title: values.title,
                            status: values.status,
                            salary_range: {
                                min: parseInt(values.minSalary),
                                max: parseInt(values.maxSalary),
                                currency: "IDR",
                                display_text: `Rp${parseInt(
                                    values.minSalary
                                ).toLocaleString("id-ID")} - Rp${parseInt(
                                    values.maxSalary
                                ).toLocaleString("id-ID")}`,
                            },
                            list_card: {
                                badge:
                                    values.status.charAt(0).toUpperCase() +
                                    values.status.slice(1),
                                started_on_text: `started on ${new Date().toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}`,
                                cta: values.cta,
                            },
                        };

                        const response = await axios.post("/api/jobs", {
                            data: [newJob],
                        });

                        if (
                            response.status === 200 ||
                            response.status === 201
                        ) {
                            onSuccess?.();
                        } else {
                            onError?.("Failed to create job");
                        }
                    } catch (error) {
                        console.error("Error creating job:", error);
                        onError?.("Error creating job. Please try again.");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue, setFieldTouched }) => (
                    <Form className="flex flex-col gap-4 mb-8 w-full">
                        <section className="border-b-2 border-dashed py-4 text-neutral-40 space-y-3">
                            <Field name="name">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Job Name"
                                            placeholder="Ex. Front End Engineer"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-danger-main text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="type">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <InputSelect
                                            {...field}
                                            label="Job Type"
                                            isMultiple={false}
                                            isLoading={false}
                                            required
                                            items={[
                                                {
                                                    id: "full-time",
                                                    label: "Full Time",
                                                },
                                                {
                                                    id: "part-time",
                                                    label: "Part Time",
                                                },
                                                {
                                                    id: "contract",
                                                    label: "Contract",
                                                },
                                                {
                                                    id: "freelance",
                                                    label: "Freelance",
                                                },
                                            ]}
                                            placeholder="Select job type"
                                            defaultSelectedItem={[]}
                                            onSelectItems={(selected) => {
                                                setFieldValue(
                                                    "type",
                                                    selected?.[0]?.id || ""
                                                );
                                                setFieldTouched("type", true);
                                            }}
                                        />
                                        {meta.touched && meta.error && (
                                            <p className="text-danger-main text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Field>

                            <Field name="description">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Textarea
                                            {...field}
                                            label="Job Description"
                                            placeholder="Ex. Front End Engineer"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-danger-main text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>

                            <Field name="maxCandidates">
                                {({ field, meta }: FieldProps) => (
                                    <div>
                                        <Input
                                            {...field}
                                            label="Number of Candidate Needed"
                                            placeholder="Ex. 10"
                                            required
                                        />
                                        {meta.touched && meta.error ? (
                                            <p className="text-danger-main text-sm mt-1">
                                                {meta.error}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </Field>
                        </section>

                        <section>
                            <h6 className="pl-1 pb-2 text-12 text-400 leading-20 text-neutral-90">
                                Job Salary
                            </h6>
                            <div className="flex gap-4 w-full">
                                <Field name="minSalary">
                                    {({ field, meta }: FieldProps) => (
                                        <div className="w-1/2">
                                            <Input
                                                {...field}
                                                label="Minimum Estimated Salary"
                                                placeholder="Rp"
                                                required
                                            />
                                            {meta.touched && meta.error ? (
                                                <p className="text-danger-main text-sm mt-1">
                                                    {meta.error}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </Field>
                                <Field name="maxSalary">
                                    {({ field, meta }: FieldProps) => (
                                        <div className="w-1/2">
                                            <Input
                                                {...field}
                                                label="Maximum Estimated Salary"
                                                placeholder="Rp"
                                                required
                                            />
                                            {meta.touched && meta.error ? (
                                                <p className="text-danger-main text-sm mt-1">
                                                    {meta.error}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="mt-2 border rounded-lg p-4">
                                <h6 className="font-700 text-14 text-neutral-90 leading-24 pb-6">
                                    Minimum Profile Information Required
                                </h6>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Full Name</h6>
                                    <MultiChip
                                        optionalDisabled={true}
                                        offDisabled={true}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Photo Profile</h6>
                                    <MultiChip
                                        optionalDisabled={true}
                                        offDisabled={true}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Gender</h6>
                                    <MultiChip
                                        optionalDisabled={false}
                                        offDisabled={false}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Domicile</h6>
                                    <MultiChip
                                        optionalDisabled={false}
                                        offDisabled={false}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Email</h6>
                                    <MultiChip
                                        optionalDisabled={true}
                                        offDisabled={true}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Phone Number</h6>
                                    <MultiChip
                                        optionalDisabled={false}
                                        offDisabled={false}
                                    />
                                </div>
                                <div className="flex justify-between px-4 border-b border-neutral-40 py-4 items-center">
                                    <h6>Linkedin Link</h6>
                                    <MultiChip
                                        optionalDisabled={false}
                                        offDisabled={false}
                                    />
                                </div>
                                <div className="flex justify-between px-4 pt-4 items-center">
                                    <h6>Date of birth</h6>
                                    <MultiChip
                                        optionalDisabled={false}
                                        offDisabled={false}
                                    />
                                </div>
                            </div>
                        </section>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default JobForm;
