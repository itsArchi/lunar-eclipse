import { Formik, Form, Field, FieldProps } from "formik";
import { Input } from "../../atoms/Input/Input";
import * as yup from "yup";
import { Button } from "../../atoms/Button/Button";
import { getAllRegencies } from "../../../utils/domicilesItems/domicilesItems";
import { useState, useEffect } from "react";
import { InputSelect, PhoneInput } from "../../atoms/InputSelect/InputSelect";
import DatePicker from "../../molecules/DatePicker/DatePicker";
import RadioButton from "../../atoms/RadioButton/RadioButton";

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

const CandidateForm = () => {
    const [items, setItems] = useState<{ id: string; label: string }[]>([]);
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
    return (
        <div>
            <Formik
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert("Candidate sukses: " + JSON.stringify(values));
                        setSubmitting(false);
                    }, 600);
                }}
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
                                            <p className="text-red-500 text-sm mt-1">
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
                                {({ field, meta, form }: FieldProps) => (
                                    <div>
                                        <InputSelect
                                            {...field}
                                            label="Domicile"
                                            isMultiple={false}
                                            isLoading={!items.length}
                                            required
                                            items={items}
                                            placeholder="Choose your domicile"
                                            defaultSelectedItem={
                                                field.value
                                                    ? items.filter(
                                                          (i) =>
                                                              i.id ===
                                                              field.value
                                                      )
                                                    : []
                                            }
                                            onSelectItems={(selected) => {
                                                const value =
                                                    selected?.[0]?.id || "";
                                                form.setFieldValue(
                                                    "domicile",
                                                    value
                                                );
                                                form.setFieldTouched(
                                                    "domicile",
                                                    true
                                                );
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
