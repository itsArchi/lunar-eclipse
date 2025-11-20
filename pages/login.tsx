"use client";
import { Formik, Form, Field, FieldProps } from "formik";
import * as yup from "yup";
import { Logo } from "../components/atoms/Logo/Logo";
import { Input } from "../components/atoms/Input/Input";
import { Button } from "../components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

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
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthStore();
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            setIsLoading(true);
            setError("");

            const { success, error } = await login(
                values.email,
                values.password
            );

            if (success) {
                router.push("/job-list");
            } else {
                setError(error || "Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred during login");
        } finally {
            setIsLoading(false);
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
                        Masuk ke Rakamin
                    </h2>

                    {message && (
                        <div
                            className={`mb-4 p-3 rounded-md ${
                                message.type === "success"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, ...formikBag }) => (
                            <Form className="flex flex-col gap-4 w-full">
                                <div className="space-y-4">
                                    <Field name="email">
                                        {({ field, meta }: FieldProps) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    label="Email"
                                                    placeholder="Email"
                                                    isDisabled={
                                                        isLoading ||
                                                        isSubmitting
                                                    }
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
                                                    isDisabled={
                                                        isLoading ||
                                                        isSubmitting
                                                    }
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
                                    <p>Belum punya akun?</p>
                                    <div className="text-primary-main">
                                        <Link href="/register">Register</Link>
                                    </div>
                                </div>

                                <Button
                                    type="secondary"
                                    isDisabled={isLoading || isSubmitting}
                                    onClick={() => formikBag.submitForm()}
                                    className="w-full"
                                >
                                    {isLoading || isSubmitting
                                        ? "Memproses..."
                                        : "Masuk"}
                                </Button>
                                {error && (
                                    <p className="text-red-500 text-sm mt-3">
                                        {error}
                                    </p>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
