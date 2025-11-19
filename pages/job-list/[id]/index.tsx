import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/templates/DashboardLayout/DashboardLayout";
import { Button } from "../../../components/atoms/Button/Button";
import CandidateTable from "../../../components/organisms/Table/CabdidatesTable";
import axios from "axios";
import Image from "next/image";
import emptyCandidates from "../../../public/assets/image/backdrop-empty-candidates.svg";

interface Job {
    id: string;
    title: string;
}

interface CandidateAttribute {
    key: string;
    label: string;
    value: string;
    order: number;
}

interface ApiCandidate {
    id: string;
    attributes: CandidateAttribute[];
    job_id?: string;
    created_at?: string;
    updated_at?: string;
}

interface Candidate {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    domicile: string;
    gender: string;
    linkedin: string;
    job_id?: string;
    created_at?: string;
    updated_at?: string;
}

interface JobDetailProps {
    job: Job | null;
    candidates: Candidate[];
}

const JobListDetailPage = ({
    job,
    candidates: initialCandidates,
}: JobDetailProps) => {
    const router = useRouter();
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [candidates, setCandidates] =
        useState<Candidate[]>(initialCandidates);

    console.log("Initial props received:", { job, initialCandidates });

    const handleSelectCandidate = (candidateId: string, selected: boolean) => {
        setSelectedCandidates((prev) =>
            selected
                ? [...prev, candidateId]
                : prev.filter((id) => id !== candidateId)
        );
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!job) {
        return (
            <DashboardLayout>
                <div className="flex flex-col justify-center min-h-[calc(75vh-64px)] p-8 font-nunito">
                    <h3 className="text-16 font-700 text-neutral-100 leading-28 mb-6">
                        asd
                    </h3>
                    <div className="text-center flex flex-col items-center justify-center w-full border min-h-[calc(85vh-64px)]">
                        <Image
                            src={emptyCandidates}
                            width={240}
                            height={240}
                            alt="No candidates illustration"
                            className="mb-6"
                        />
                        <h5 className="text-16 font-700 text-neutral-100 leading-28 mb-2">
                            No candidates found
                        </h5>
                        <p className="text-neutral-70 text-16 font-400 leading-24">
                            Share your job vacancies so that more candidates
                            will apply.
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="mb-6">
                    <Button
                        type="secondary"
                        onClick={() => router.back()}
                        className="mb-6"
                    >
                        ← Back to Jobs
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-neutral-100">
                            {job.title} - Manage Candidate
                        </h1>
                        <div className="flex gap-4">
                            <Button type="secondary" onClick={() => {}}>
                                Export to Excel
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {}}
                                // disabled={selectedCandidates.length === 0}
                            >
                                Send Email ({selectedCandidates.length})
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <CandidateTable
                            candidates={candidates}
                            selectedCandidates={selectedCandidates}
                            onSelectCandidate={handleSelectCandidate}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const [jobRes, candidatesRes] = await Promise.all([
            axios.get(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/jobs?id=eq.${id}`,
                {
                    headers: {
                        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        Authorization: `Bearer ${process.env
                            .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                    },
                }
            ),
            axios.get(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/candidates?job_id=eq.${id}&select=*`,
                {
                    headers: {
                        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        Authorization: `Bearer ${process.env
                            .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation",
                    },
                }
            ),
        ]);

        console.log("Job Response:", jobRes.data);
        console.log("Candidates Response:", candidatesRes.data);

        if (!jobRes.data || jobRes.data.length === 0) {
            console.log("No job found with id:", id);
            return { notFound: true };
        }

        if (!candidatesRes.data || candidatesRes.data.length === 0) {
            console.log("No candidates found for job id:", id);
            return {
                props: {
                    job: jobRes.data[0],
                    candidates: [],
                },
            };
        }

        const formattedCandidates = (candidatesRes.data || []).map(
            (candidate: any) => {
                console.log("Processing candidate:", candidate);
                const attributes = candidate.attributes || [];
                const getAttribute = (key: string) => {
                    const attr = attributes.find(
                        (attr: any) => attr.key === key
                    );
                    console.log(`Getting attribute ${key}:`, attr?.value);
                    return attr?.value || "";
                };

                const formattedCandidate = {
                    id: candidate.id,
                    fullName: getAttribute("full_name"),
                    email: getAttribute("email"),
                    phone: getAttribute("phone"),
                    domicile: getAttribute("domicile"),
                    gender: getAttribute("gender"),
                    linkedin: getAttribute("linkedin_link"),
                    job_id: candidate.job_id,
                    created_at: candidate.created_at,
                    updated_at: candidate.updated_at,
                };

                console.log("Formatted candidate:", formattedCandidate);
                return formattedCandidate;
            }
        );

        console.log("Formatted candidates:", formattedCandidates);

        return {
            props: {
                job: jobRes.data[0],
                candidates: formattedCandidates,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                job: null,
                candidates: [],
            },
        };
    }
};

export default JobListDetailPage;
