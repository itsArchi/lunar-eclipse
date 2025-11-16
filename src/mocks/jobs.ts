export interface JobData {
    id: string;
    slug: string;
    title: string;
    status: "active" | "inactive" | "draft";
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

export const mockJobs: JobData[] = [
    {
        id: "job_20251001_0001",
        slug: "frontend-developer",
        title: "Frontend Developer",
        status: "active",
        salary_range: {
            min: 7000000,
            max: 8000000,
            currency: "IDR",
            display_text: "Rp7.000.000 - Rp8.000.000",
        },
        list_card: {
            badge: "Active",
            started_on_text: "started on 1 Oct 2025",
            cta: "Manage Job",
        },
    },
    {
        id: "job_20251002_0002",
        slug: "backend-developer",
        title: "Backend Developer",
        status: "active",
        salary_range: {
            min: 8000000,
            max: 10000000,
            currency: "IDR",
            display_text: "Rp8.000.000 - Rp10.000.000",
        },
        list_card: {
            badge: "Active",
            started_on_text: "started on 2 Oct 2025",
            cta: "Manage Job",
        },
    },
    {
        id: "job_20251003_0003",
        slug: "ui-ux-designer",
        title: "UI/UX Designer",
        status: "draft",
        salary_range: {
            min: 6000000,
            max: 7500000,
            currency: "IDR",
            display_text: "Rp6.000.000 - Rp7.500.000",
        },
        list_card: {
            badge: "Draft",
            started_on_text: "started on 3 Oct 2025",
            cta: "Manage Job",
        },
    },
];
