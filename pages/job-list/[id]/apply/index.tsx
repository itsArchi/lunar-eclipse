import { Button } from "../../../../components/atoms/Button/Button";
import CandidateForm from "../../../../components/organisms/Form/CandidateForm";
import DashboardLayout from "../../../../components/templates/DashboardLayout/DashboardLayout";
import ArrowLeftIcon from "../../../../public/assets/icon/ArrowLeft";
import ArrowUpTrayIcon from "../../../../public/assets/icon/ArrowUpTray";
import ModalSimple from "../../../../components/organisms/ModalPicture/ModalPicture";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import {
    showErrorToast,
    showSuccessToast,
} from "../../../../components/atoms/Toast/Toast";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../../utils/supabase/supabase";
// import type { PoseCaptureProps } from "../../../components/organisms/PoseCapture/PoseCapture";

const PoseCapture = dynamic(
    () => import("../../../../components/organisms/PoseCapture/PoseCapture"),
    {
        ssr: false,
    }
);

const JobApplyPage = () => {
    const router = useRouter();
    const { id: jobIdFromQuery, jobId: jobIdAlt } = router.query as any;
    const jobId = jobIdFromQuery ?? jobIdAlt ?? router.query.id ?? undefined;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCapture = (dataUrl: string) => {
        setPhotoDataUrl(dataUrl);
        setIsModalOpen(false);
    };

    const handleSubmitApplication = async (
        candidatePayload: Record<string, any>
    ) => {
        if (!jobId) {
            showErrorToast(
                "Job ID tidak ditemukan. Coba ulangi dari halaman job yang benar."
            );
            return;
        }

        setSubmitting(true);
        try {
            const {
                data: { user },
                error: userErr,
            } = await supabase.auth.getUser();

            if (userErr || !user) {
                showErrorToast(
                    "Anda harus login terlebih dahulu untuk mengajukan lamaran."
                );
                setSubmitting(false);
                return;
            }

            const applicantId = `cand_${uuidv4()}`;

            const metadata = {
                applicant_id: user.id,
                applicant_email: user.email,
                form: candidatePayload,
                photo: photoDataUrl ?? null,
            };

            const { data, error: insertErr } = await supabase
                .from("applicants")
                .insert({
                    id: applicantId,
                    job_id: String(jobId),
                    metadata,
                    applied_at: new Date().toISOString(),
                });

            if (insertErr) {
                console.error("Insert applicants error:", insertErr);
                showErrorToast(insertErr.message || "Gagal menyimpan lamaran");
                setSubmitting(false);
                return;
            }

            showSuccessToast("Lamaran berhasil dikirim. Terima kasih!");
            router.push("/job-list");
        } catch (err) {
            console.error("Apply error:", err);
            showErrorToast("Terjadi kesalahan saat mengirim lamaran.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout className="min-h-[95vh] bg-neutral-20 font-nunito">
            <div className="flex items-center  justify-center font-nunito">
                <div className="border p-10 bg-neutral-10 border-neutral-40 flex flex-col w-[60%]">
                    <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-4">
                            <div className="border p-2 rounded-lg">
                                <ArrowLeftIcon className="w-4 h-4 font-700 text-neutral-100" />
                            </div>
                            <h3 className="text-18 font-700 leading-28 text-neutral-100">
                                Apply Front End at Here
                            </h3>
                        </div>
                        <div className="">
                            <p className="text-14 font-400 leading-24 text-neutral-90">
                                ℹ️ This field required to fill
                            </p>
                        </div>
                    </div>

                    <div className="p-8 border flex flex-col space-y-4 justify-start mt-6">
                        <h6 className="'text-12 font-700 leading-20 text-danger-main">
                            * Required
                        </h6>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <h6 className="ml-4 pb-4">Photo Profile</h6>
                                <div className="rounded-full w-32 h-32 border overflow-hidden bg-neutral-20 flex items-center justify-center">
                                    {photoDataUrl ? (
                                        photoDataUrl.startsWith("data:") ? (
                                            <img
                                                src={photoDataUrl}
                                                alt="photo preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src={photoDataUrl}
                                                alt="photo preview"
                                                className="w-full h-full object-cover"
                                            />
                                        )
                                    ) : (
                                        <div className="text-sm text-neutral-60">
                                            No photo
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <Button
                                        type="outline"
                                        icon={<ArrowUpTrayIcon />}
                                        className="max-w-[180px]"
                                        onClick={handleOpenModal}
                                    >
                                        Take a Picture
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <CandidateForm
                            jobId={jobId}
                            onSubmit={handleSubmitApplication}
                        />
                    </div>
                </div>
            </div>

            <ModalSimple
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Raise Your Hand to Capture"
            >
                <div className="space-y-3">
                    <p className="text-sm text-neutral-70">
                        Follow the instructions and the system will capture when
                        pose is correct.
                    </p>

                    <PoseCapture
                        requiredPoses={["one", "two"]}
                        countdownSeconds={3}
                        onCapture={handleCapture}
                    />

                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            className="px-3 py-2 bg-neutral-20 rounded border border-neutral-30"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalSimple>
        </DashboardLayout>
    );
};

export default JobApplyPage;
