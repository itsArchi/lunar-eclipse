"use client";
import { Formik, Form, Field, FieldProps } from "formik";
import * as yup from "yup";
import { Logo } from "../components/atoms/Logo/Logo";
import { Input } from "../components/atoms/Input/Input";
import { Button } from "../components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterSchema = yup.object().shape({
    name: yup.string().required("Nama lengkap wajib diisi"),
    email: yup
        .string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
    password: yup
        .string()
        .min(6, "Minimal 6 karakter")
        .required("Password wajib diisi"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password tidak cocok")
        .required("Konfirmasi password wajib diisi"),
});

const RegisterPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            const signInResult = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: "/job-list",
            });

            if (signInResult?.error) {
                router.push("/login?registered=true");
            } else {
                router.push(signInResult?.url || "/job-list");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError(
                err instanceof Error ? err.message : "Registration failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-nunito">
            <div className="max-w-fit w-full flex flex-col items-center gap-12">
                <div className="flex justify-start w-full">
                    <Logo />
                </div>
                <div className="w-full md:w-[420px] bg-neutral-10 shadow-lg rounded-md p-8 gap-4">
                    <h2 className="font-700 text-20 leading-[30px] text-neutral-100 mb-6">
                        Daftar ke App
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            errors,
                            touched,
                            handleSubmit,
                            isSubmitting: formikIsSubmitting,
                        }) => (
                            <Form className="flex flex-col gap-4 w-full">
                                <div className="space-y-4">
                                    <Field name="name">
                                        {({ field, meta }: FieldProps) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    label="Nama Lengkap"
                                                    placeholder="Nama lengkap"
                                                    isDisabled={isSubmitting}
                                                />
                                                {meta.touched && meta.error && (
                                                    <p className="text-red-500 text-sm mt-1">
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
                                                    placeholder="Email"
                                                    isDisabled={isSubmitting}
                                                />
                                                {meta.touched && meta.error && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {meta.error}
                                                    </p>
                                                )}
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
                                                    isDisabled={isSubmitting}
                                                />
                                                {meta.touched && meta.error && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {meta.error}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="confirmPassword">
                                        {({ field, meta }: FieldProps) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    label="Konfirmasi Password"
                                                    placeholder="Konfirmasi password"
                                                    isDisabled={isSubmitting}
                                                />
                                                {meta.touched && meta.error && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {meta.error}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div className="flex text-12 font-400 gap-2">
                                    <p>Sudah punya akun?</p>
                                    <div className="text-primary-main">
                                        <Link href="/login">Login</Link>
                                    </div>
                                </div>

                                <Button
                                    type="secondary"
                                    isDisabled={
                                        formikIsSubmitting || isSubmitting
                                    }
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const form =
                                            document.getElementById(
                                                "register-form"
                                            );
                                        if (form) {
                                            const submitEvent = new Event(
                                                "submit",
                                                {
                                                    cancelable: true,
                                                    bubbles: true,
                                                }
                                            );
                                            form.dispatchEvent(submitEvent);
                                        }
                                    }}
                                >
                                    {isSubmitting
                                        ? "Mendaftarkan..."
                                        : "Daftar"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
