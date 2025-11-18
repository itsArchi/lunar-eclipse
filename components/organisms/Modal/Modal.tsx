import { useState, useRef } from "react";
import { showSuccessToast } from "../../atoms/Toast/Toast";
import { Button } from "../../atoms/Button/Button";
import JobForm from "../../molecules/Form/JobForm";
import CrossIcon from "../../../public/assets/icon/Cross";
import axios from "axios";

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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobData?: Job[];
    showJobList?: boolean;
    onSuccess?: () => void;
}

const Modal = ({
    isOpen,
    onClose,
    jobData,
    showJobList = false,
    onSuccess,
}: ModalProps) => {
    const formikRef = useRef<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-[70%] h-full max-h-[85vh] flex flex-col">
                <div className="border-b border-neutral-40 pb-4 flex-shrink-0 flex justify-between">
                    <h5 className="text-lg font-semibold">Job Opening</h5>
                    <button
                        onClick={onClose}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <CrossIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mt-4 pr-8">
                    <JobForm
                        formikRef={formikRef}
                        showJobList={showJobList}
                        jobData={jobData}
                        onSuccess={() => {
                            setIsSubmitting(false);
                            onSuccess?.();
                            onClose();
                        }}
                        onError={(errorMessage) => {
                            setIsSubmitting(false);
                            setError(errorMessage);
                        }}
                    />
                </div>
                <div className="flex justify-end pr-8 border-t pt-4">
                    {error && (
                        <div className="flex-1 text-danger-main text-sm mr-4">
                            {error}
                        </div>
                    )}
                    <Button
                        onClick={() => {
                            console.log("Publish button clicked");
                            console.log(
                                "formikRef.current:",
                                formikRef.current
                            );
                            if (formikRef.current && formikRef.current.values) {
                                console.log("Calling submit directly");
                                setIsSubmitting(true);
                                setError(null);

                                const values = formikRef.current.values;
                                console.log("Current form values:", values);

                                const submitHandler = async () => {
                                    try {
                                        const generatedSlug =
                                            values.name && values.name.trim()
                                                ? values.name
                                                      .trim()
                                                      .toLowerCase()
                                                      .replace(/\s+/g, "-")
                                                      .replace(
                                                          /[^a-z0-9-]+/g,
                                                          ""
                                                      )
                                                : `job-${Date.now()}`;

                                        const newJob = {
                                            id: `job_${new Date()
                                                .toISOString()
                                                .slice(0, 10)
                                                .replace(
                                                    /-/g,
                                                    ""
                                                )}_${Math.random()
                                                .toString(36)
                                                .substr(2, 4)}`,
                                            slug: generatedSlug,
                                            title: values.name,
                                            status: values.status,
                                            salary_range: {
                                                min: parseInt(values.minSalary),
                                                max: parseInt(values.maxSalary),
                                                currency: "IDR",
                                                display_text: `Rp${parseInt(
                                                    values.minSalary
                                                ).toLocaleString(
                                                    "id-ID"
                                                )} - Rp${parseInt(
                                                    values.maxSalary
                                                ).toLocaleString("id-ID")}`,
                                            },
                                            list_card: {
                                                badge: values.badge,
                                                started_on_text: `started on ${new Date().toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}`,
                                                cta: values.cta,
                                            },
                                        };

                                        console.log(
                                            "Making API call to /api/jobs"
                                        );
                                        const response = await axios.post(
                                            "/api/jobs",
                                            {
                                                data: [newJob],
                                            }
                                        );
                                        console.log(
                                            "API response received:",
                                            response.status
                                        );

                                        if (
                                            response.status === 200 ||
                                            response.status === 201
                                        ) {
                                            console.log(
                                                "Job created successfully, calling onSuccess"
                                            );
                                            onSuccess?.();
                                            showSuccessToast(
                                                "Job created successfully!"
                                            );
                                            onClose();
                                        } else {
                                            console.log(
                                                "Unexpected response status:",
                                                response.status
                                            );
                                            setError("Failed to create job");
                                        }
                                    } catch (error) {
                                        console.error(
                                            "Error creating job:",
                                            error
                                        );
                                        setError(
                                            "Error creating job. Please try again."
                                        );
                                    } finally {
                                        setIsSubmitting(false);
                                    }
                                };

                                submitHandler();
                            } else {
                                console.log(
                                    "formikRef.current or submitForm not available"
                                );
                            }
                        }}
                        type="primary"
                        isDisabled={isSubmitting}
                    >
                        {isSubmitting ? "Publishing..." : "Publish Job"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
