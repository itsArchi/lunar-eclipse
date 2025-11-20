import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/templates/DashboardLayout/DashboardLayout";
import Search from "../../../components/atoms/Search/Search";
import { Button } from "../../../components/atoms/Button/Button";
import CardJobListApplicant from "../../../components/molecules/CardJobListApplicant.tsx";
import { LogoIcon } from "../../../components/atoms/LogoIcon/LogoIcon";
import Image from "next/image";
import { description } from "../../../utils/description/description";

interface Job {
    id: string;
    title: string;
    slug: string;
    company: string;
    status: string;
    location: string;
    salary_range: {
        min: number;
        max: number;
        currency: string;
        display_text: string;
    };
    type: string;
    created_at: string;
    logo_url?: string;
}

const JobListPage = () => {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeJobId, setActiveJobId] = useState<string | null>(null);

    const getRandomDescription = () => {
        const randomIndex = Math.floor(Math.random() * description.length);
        return description[randomIndex].responsibilities;
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("/api/jobs");
                setJobs(response.data.data || []);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (filteredJobs.length > 0 && !activeJobId) {
            setActiveJobId(filteredJobs[0].id);
        }
    }, [filteredJobs, activeJobId]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-64">
                    <p>Loading jobs...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="px-12 py-6 font-nunito">
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-neutral-100 w-[10%]">
                            Job Listings
                        </h1>
                        <Search
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search jobs, companies, or locations"
                            className="w-full "
                        />
                    </div>

                    <div className="flex justify-between gap-6">
                        {/* Job List Sidebar */}
                        <div className="space-y-4 w-[25%]">
                            {filteredJobs.map((job) => (
                                <CardJobListApplicant
                                    key={job.id}
                                    title={job.title}
                                    company={job.company || "Anonim"}
                                    location={job.location || "Not specified"}
                                    salary={
                                        job.salary_range?.display_text ||
                                        "Not specified"
                                    }
                                    onClick={() => {
                                        setActiveJobId(job.id);
                                    }}
                                    className={`max-h-40 transition-colors ${
                                        activeJobId === job.id
                                            ? "bg-primary-surface border-2 border-primary-main"
                                            : "bg-neutral-20 border-2 border-neutral-40"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Job Details Panel */}
                        {filteredJobs.length > 0 && (
                            <div className="w-[80%] bg-white rounded-lg shadow-sm p-6 border border-neutral-40">
                                {activeJobId &&
                                    (() => {
                                        const activeJob =
                                            filteredJobs.find(
                                                (job) => job.id === activeJobId
                                            ) || filteredJobs[0];
                                        if (!activeJob) return null;
                                        return (
                                            <>
                                                <div className="flex justify-between items-start pb-6 border-b border-neutral-40">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-16 h-16 flex-shrink-0 pl-3 bg-neutral-10 border rounded-lg flex items-center justify-center">
                                                            {filteredJobs[0]
                                                                .logo_url ? (
                                                                <Image
                                                                    src={
                                                                        filteredJobs[0]
                                                                            .logo_url
                                                                    }
                                                                    alt={
                                                                        filteredJobs[0]
                                                                            .company
                                                                    }
                                                                    className="w-12 h-12"
                                                                />
                                                            ) : (
                                                                <LogoIcon size="md" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="inline-block bg-primary-main text-neutral-10 text-12 font-700 leading-20 px-2 py-1 rounded mb-2">
                                                                {filteredJobs[0]
                                                                    .type ||
                                                                    "Full Time"}
                                                            </span>
                                                            <h2 className="text-18 font-700 leading-28 text-neutral-90">
                                                                {
                                                                    filteredJobs[0]
                                                                        .title
                                                                }
                                                            </h2>
                                                            <p className="text-neutral-70 text-14 font-400 leading-24">
                                                                {
                                                                    filteredJobs[0]
                                                                        .company
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="secondary"
                                                        onClick={() =>
                                                            router.push(
                                                                `/job-list/${activeJob.id}/apply`
                                                            )
                                                        }
                                                        className="text-14 font-bold leading-24 text-neutral-90"
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                                <div className="mt-6">
                                                    <h3 className="text-lg font-semibold mb-3">
                                                        Job Responsibilities:
                                                    </h3>
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        {getRandomDescription().map(
                                                            (item, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="text-neutral-90"
                                                                >
                                                                    {item}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        );
                                    })()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JobListPage;
