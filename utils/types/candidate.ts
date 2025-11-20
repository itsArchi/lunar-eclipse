export interface CandidateAttribute {
    key: string;
    label: string;
    value: string;
    order: number;
}

export interface Candidate {
    id: string;
    job_id: string;
    full_name?: string;
    email?: string;
    phone?: string;
    domicile?: string;
    gender?: string;
    linkedin?: string;
    metadata?: CandidateMetadata;
    created_at?: string;
    updated_at?: string;
    applied_at: string;
}

export interface CandidateMetadata {
    attributes: CandidateAttribute[];
    map?: Record<string, string>;
}
