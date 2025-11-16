import { create } from "zustand";
import { JobData } from "@/mocks/jobs";

interface JobStore {
    jobs: JobData[];
    setJobs: (jobs: JobData[]) => void;
    addJob: (job: JobData) => void;
    updateJob: (id: string, job: Partial<JobData>) => void;
    deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
    jobs: [],
    setJobs: (jobs) => set({ jobs }),
    addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
    updateJob: (id, updatedJob) =>
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === id ? { ...job, ...updatedJob } : job
            ),
        })),
    deleteJob: (id) =>
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
        })),
}));
