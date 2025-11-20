import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/templates/DashboardLayout/DashboardLayout";
import CandidateTable from "../../../components/organisms/Table/CabdidatesTable";
import axios from "axios";
import Image from "next/image";
import emptyCandidates from "../../../public/assets/image/backdrop-empty-candidates.svg";
import { Candidate } from "../../../utils/types/candidate";

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

interface JobDetailProps {
    job: Job | null;
    candidates: Candidate[];
}

const normalizeCandidate = (raw: any) => {
    const attributes = raw.metadata?.attributes || raw.attributes || [];

    const map: Record<string, string> = {};
    attributes.forEach((a: any) => {
        let k = a.key;
        if (k === "linkedin_link") k = "linkedin";
        if (k === "phone_number") k = "phone";
        map[k] = a.value;
    });

    const candidate: Candidate = {
        id: raw.id,
        job_id: raw.job_id,
        applied_at: raw.applied_at || raw.created_at || "",
        metadata: {
            attributes,
            map,
        },
        full_name: map["full_name"] || "",
        email: map["email"] || "",
        phone: map["phone"] || "",
        domicile: map["domicile"] || "",
        gender: map["gender"] || "",
        linkedin: map["linkedin"] || "",
    };

    return candidate;
};

const JobListDetailPage = ({
    job,
    candidates: initialCandidates,
}: JobDetailProps) => {
    const router = useRouter();
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [candidates, setCandidates] =
        useState<Candidate[]>(initialCandidates);

    const fetchJobApplicants = async (jobId: string) => {
        try {
            const response = await fetch(`/api/jobs?jobId=${jobId}`);
            const payload = await response.json();

            if (!payload.success || !Array.isArray(payload.data)) {
                console.warn("Unexpected payload from /api/jobs", payload);
                return;
            }

            const formattedCandidates: Candidate[] = payload.data.map(
                (raw: any) => normalizeCandidate(raw)
            );

            setCandidates(formattedCandidates);
            console.log("Formatted candidates:", formattedCandidates);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (router.query.id) {
                await fetchJobApplicants(router.query.id as string);
            }
        };

        fetchData();

        return () => {};
    }, [router.query.id]);

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

    if (!job && (!candidates || candidates.length === 0)) {
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
                            loading="eager"
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
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-neutral-100">
                            {job?.title}
                        </h1>
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

    const normalizeRaw = (c: any) => {
        const attributes = c.metadata?.attributes || c.attributes || [];
        const map: Record<string, string> = {};
        attributes.forEach((a: any) => {
            let k = a.key;
            if (k === "linkedin_link") k = "linkedin";
            if (k === "phone_number") k = "phone";
            map[k] = a.value;
        });
        return {
            id: c.id,
            job_id: c.job_id,
            applied_at: c.applied_at || c.created_at || "",
            metadata: { attributes, map },
            full_name: map["full_name"] || "",
            email: map["email"] || "",
            phone: map["phone"] || "",
            domicile: map["domicile"] || "",
            gender: map["gender"] || "",
            linkedin: map["linkedin"] || "",
        } as any;
    };

    try {
        const jobPromise = axios.get(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/jobs?id=eq.${id}`,
            {
                headers: {
                    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    Authorization: `Bearer ${process.env
                        .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                },
            }
        );

        const candPromise = axios.get(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/candidates?job_id=eq.${id}`,
            {
                headers: {
                    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    Authorization: `Bearer ${process.env
                        .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                },
            }
        );

        const [jobRes, candidatesRes] = await Promise.allSettled([
            jobPromise,
            candPromise,
        ]);

        let job = null;
        if (jobRes.status === "fulfilled") {
            const data = jobRes.value?.data;
            job = Array.isArray(data) && data.length > 0 ? data[0] : null;
            console.log("SSR: job found?", !!job);
        } else {
            console.warn(
                "SSR: job fetch failed:",
                jobRes.reason?.response?.status || jobRes.reason
            );
            if (jobRes.reason?.response?.data) {
                console.warn(
                    "SSR: job fetch response body:",
                    jobRes.reason.response.data
                );
            }
        }

        let normalizedCandidates: any[] = [];
        if (candidatesRes.status === "fulfilled") {
            const raw = candidatesRes.value?.data || [];
            console.log(
                "SSR: candidates fetched (count):",
                Array.isArray(raw) ? raw.length : typeof raw
            );
            normalizedCandidates = (Array.isArray(raw) ? raw : []).map(
                (c: any) => normalizeRaw(c)
            );
        } else {
            console.warn(
                "SSR: candidates fetch failed:",
                candidatesRes.reason?.response?.status || candidatesRes.reason
            );
            if (candidatesRes.reason?.response?.data) {
                console.warn(
                    "SSR: candidates fetch response body:",
                    candidatesRes.reason.response.data
                );
            }
        }

        return {
            props: {
                job,
                candidates: normalizedCandidates,
            },
        };
    } catch (error) {
        console.error("Unexpected SSR error:", error);
        return {
            props: {
                job: null,
                candidates: [],
                error: "Failed to load job data",
            },
        };
    }
};

export default JobListDetailPage;
