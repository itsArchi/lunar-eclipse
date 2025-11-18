// pages/job-list/index.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/templates/DashboardLayout/DashboardLayout";
import Search from "../../components/atoms/Search/Search";
import { Button } from "../../components/atoms/Button/Button";
import CardJobListApplicant from "../../components/molecules/CardJobListApplicant.tsx";
import { LogoIcon } from "../../components/atoms/LogoIcon/LogoIcon";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    created_at: string;
    logo_url?: string;
}

const JobListPage = () => {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

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
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <h1 className="text-2xl font-bold text-neutral-100">
                            Job Listings
                        </h1>
                        <Search
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search jobs, companies, or locations"
                            className="w-96"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Job List Sidebar */}
                        <div className="space-y-4">
                            {filteredJobs.map((job) => (
                                <CardJobListApplicant
                                    key={job.id}
                                    title={job.title}
                                    company={job.company}
                                    location={job.location}
                                    salary={job.salary}
                                    onClick={() =>
                                        router.push(`/job-list/${job.id}`)
                                    }
                                />
                            ))}
                        </div>

                        {/* Job Details Panel */}
                        {filteredJobs.length > 0 && (
                            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                                            {filteredJobs[0].logo_url ? (
                                                <img
                                                    src={
                                                        filteredJobs[0].logo_url
                                                    }
                                                    alt={
                                                        filteredJobs[0].company
                                                    }
                                                    className="w-12 h-12 object-contain"
                                                />
                                            ) : (
                                                <LogoIcon size="lg" />
                                            )}
                                        </div>
                                        <div>
                                            <span className="inline-block bg-primary-surface text-primary-main text-xs font-bold px-2 py-1 rounded-md mb-2">
                                                {filteredJobs[0].type}
                                            </span>
                                            <h2 className="text-2xl font-bold text-neutral-100">
                                                {filteredJobs[0].title}
                                            </h2>
                                            <p className="text-neutral-90 mt-1">
                                                {filteredJobs[0].company} •{" "}
                                                {filteredJobs[0].location}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            router.push(
                                                `/job-list/${filteredJobs[0].id}/apply`
                                            )
                                        }
                                    >
                                        Apply Now
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-100 mb-3">
                                            Job Description
                                        </h3>
                                        <p className="text-neutral-90">
                                            {/* Add job description here or fetch from API */}
                                            We are looking for a skilled [Job
                                            Title] to join our team...
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-100 mb-3">
                                            Requirements
                                        </h3>
                                        <ul className="list-disc pl-5 space-y-2 text-neutral-90">
                                            <li>
                                                3+ years of experience in
                                                [relevant field]
                                            </li>
                                            <li>
                                                Strong knowledge of [specific
                                                skills]
                                            </li>
                                            <li>
                                                Excellent communication skills
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-100 mb-3">
                                            Salary
                                        </h3>
                                        <p className="text-neutral-90">
                                            {filteredJobs[0].salary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JobListPage;
