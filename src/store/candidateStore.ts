import { create } from "zustand";
import { Candidate } from "@/mocks/candidates";

interface CandidateStore {
    candidates: Candidate[];
    setCandidates: (candidates: Candidate[]) => void;
    addCandidate: (candidate: Candidate) => void;
    updateCandidate: (id: string, candidate: Partial<Candidate>) => void;
    deleteCandidate: (id: string) => void;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
    candidates: [],
    setCandidates: (candidates) => set({ candidates }),
    addCandidate: (candidate) =>
        set((state) => ({ candidates: [...state.candidates, candidate] })),
    updateCandidate: (id, updatedCandidate) =>
        set((state) => ({
            candidates: state.candidates.map((candidate) =>
                candidate.id === id
                    ? { ...candidate, ...updatedCandidate }
                    : candidate
            ),
        })),
    deleteCandidate: (id) =>
        set((state) => ({
            candidates: state.candidates.filter(
                (candidate) => candidate.id !== id
            ),
        })),
}));
