"use client";
import { Formik, Form, Field, FieldProps } from "formik";
import * as yup from "yup";
import { Logo } from "../components/atoms/Logo/Logo";
import { Input } from "../components/atoms/Input/Input";
import { Button } from "../components/atoms/Button/Button";

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
    password: yup
        .string()
        .min(6, "Minimal 6 karakter")
        .required("Password wajib diisi"),
});

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-nunito">
            <div className="max-w-fit w-full flex flex-col items-center gap-12">
                <div className="flex justify-start w-full">
                    <Logo />
                </div>
                {/* Right: card */}
                <div className="w-full md:w-[420px] bg-neutral-10 shadow-lg rounded-md p-8 gap-4">
                    <h2 className="font-700 text-20 leading-[30px] text-neutral-100">
                        Masuk ke Rakamin
                    </h2>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(
                                    "Login sukses: " + JSON.stringify(values)
                                );
                                setSubmitting(false);
                            }, 600);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col gap-4 max-w-[696px] mb-8 w-full">
                                <div>
                                    <Field name="email">
                                        {({ field, meta }: FieldProps) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    label="Email"
                                                    placeholder="Email"
                                                />
                                                {meta.touched && meta.error ? (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {meta.error}
                                                    </p>
                                                ) : null}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="password">
                                        {({ field, meta }: FieldProps) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    label="Password"
                                                    placeholder="Password"
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

                                <Button
                                    type="secondary"
                                    isDisabled={isSubmitting}
                                >
                                    {isSubmitting ? "Memproses..." : "Masuk"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
