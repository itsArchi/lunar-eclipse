import { Formik, Form, Field, FieldProps } from "formik";
import { Input } from "../../atoms/Input/Input";
import { InputSelect } from "../../atoms/InputSelect/InputSelect";
import * as Yup from "yup";
import { Textarea } from "../../atoms/TextArea/TextArea";
import { MultiChip } from "../MultiChip/MultiChip";

interface JobFormValues {
    name: string;
    type: string;
    description: string;
    maxCandidates: string;  
    minSalary: string;
    maxSalary: string;
}

const JobFormInitialValues: JobFormValues = {
    name: "",
    type: "",
    description: "",
    maxCandidates: "",
    minSalary: "",
    maxSalary: "",
};

const JobFormValidationSchema = {
    title: Yup.string().required("Job title is required"),
    type: Yup.string().required("Job type is required"),
    description: Yup.string().required("Job description is required"),
    maxCandidates: Yup.string().required("Max candidates is required"),
    minSalary: Yup.string().required("Min salary is required"),
    maxSalary: Yup.string().required("Max salary is required"),
};

const JobForm = () => {
    return (
        <div>
            <Formik
                initialValues={JobFormInitialValues}
                validationSchema={JobFormValidationSchema}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert("Job Form submitted: " + JSON.stringify(values));
                    }, 600);
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
