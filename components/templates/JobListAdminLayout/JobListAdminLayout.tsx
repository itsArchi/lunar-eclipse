import Search from "../../atoms/Search/Search";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import CardAsideJob from "../../molecules/CardAsideJob";
import { useState, useEffect } from "react";
import Modal from "../../organisms/Modal/Modal";
import axios from "axios";
import CardJobListAdmin from "../../molecules/CardJobListAdmin";
import EmptyJob from "../../molecules/EmptyJob/EmptyJob";

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

const JobListAdminLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleJobCreated = () => {
        fetchJobs();
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/jobs`,
                {
                    params: {
                        select: "*",
                        order: "created_at.desc",
                    },
                    headers: {
                        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        Authorization: `Bearer ${process.env
                            .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                    },
                }
            );

            setJobs(response.data || []);
        } catch (error) {
            console.error("REST API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <DashboardLayout>
            <div className="px-8 py-6 font-nunito flex justify-between gap-8">
                <div className="flex flex-col gap-8 w-full">
                    <Search
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        placeholder="Search by job details"
                    />
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="p-2 rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)]"
                                >
                                    <CardJobListAdmin
                                        id={job.id}
                                        startedDate={
                                            job.list_card.started_on_text
                                        }
                                        status={job.list_card.badge}
                                        title={job.title}
                                        salary={job.salary_range.display_text}
                                        cta={job.list_card.cta}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyJob onClick={handleOpenModal} />
                    )}
                </div>
                <div className="w-[25%]">
                    <CardAsideJob />
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={handleJobCreated}
                />
            )}
        </DashboardLayout>
    );
};

export default JobListAdminLayout;
