import Image from "next/image";
import Search from "../../components/atoms/Search/Search";
import empty from "../../public/assets/image/empty.svg";
import DashboardLayout from "../../components/templates/DashboardLayout/DashboardLayout";
import CardAsideJob from "../../components/molecules/CardAsideJob";
import { Button } from "../../components/atoms/Button/Button";
import { useState, useEffect } from "react";
import Modal from "../../components/organisms/Modal/Modal";
import { supabase } from "../../utils/supabase/supabase";

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/graphql`;

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

const JobListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const query = `
                    query GetJobs {
                        jobs(order_by: { created_at: desc }) {
                            id
                            slug
                            title
                            status
                            salary_range {
                                min
                                max
                                currency
                                display_text
                            }
                            list_card {
                                badge
                                started_on_text
                                cta
                            }
                        }
                    }
                `;

                const response = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        Authorization: `Bearer ${process.env
                            .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                    },
                    body: JSON.stringify({ query }),
                });

                const result = await response.json();

                if (result.errors) {
                    console.error("GraphQL errors:", result.errors);
                } else {
                    setJobs(result.data?.jobs || []);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <DashboardLayout>
            <div className="px-8 py-6 font-nunito">
                <div className="flex justify-between gap-8">
                    <Search value="" onChange={(value) => {}} />
                    <CardAsideJob className="w-[20%]" />
                </div>
                {jobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="border border-neutral-20 rounded-lg p-6 bg-white"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-18 font-700 leading-28 text-neutral-90 mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`inline-block px-3 py-1 text-12 font-700 leading-20 rounded-full ${
                                                    job.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-neutral-100 text-neutral-600"
                                                }`}
                                            >
                                                {job.list_card.badge}
                                            </span>
                                            <p className="text-12 font-400 leading-20 text-neutral-60">
                                                {job.list_card.started_on_text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-16 font-700 leading-24 text-neutral-90">
                                            {job.salary_range.display_text}
                                        </p>
                                        <Button
                                            type="primary"
                                            size="sm"
                                            className="text-12 font-700 leading-20 mt-2"
                                        >
                                            {job.list_card.cta}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 max-w-[82%]">
                        <Image
                            src={empty}
                            width={300}
                            height={300}
                            alt="empty"
                        />
                        <h5 className="text-20 font-700 leading-32 text-neutral-90">
                            No job openings available
                        </h5>
                        <p className="text-16 font-400 leading-28 text-neutral-90">
                            Create a job opening now and start the candidate
                            process.
                        </p>

                        <Button
                            type="secondary"
                            size="lg"
                            className="text-16 font-700 leading-28 text-neutral-90"
                            onClick={handleOpenModal}
                        >
                            Create a new job
                        </Button>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </DashboardLayout>
    );
};

export default JobListPage;
