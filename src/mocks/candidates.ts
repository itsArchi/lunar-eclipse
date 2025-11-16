export interface CandidateAttribute {
    key: string;
    label: string;
    value: string;
    order: number;
}

export interface Candidate {
    id: string;
    attributes: CandidateAttribute[];
}

export const mockCandidates: Candidate[] = [
    {
        id: "cand_20251008_0001",
        attributes: [
            {
                key: "full_name",
                label: "Full Name",
                value: "Nadia Putri",
                order: 1,
            },
            {
                key: "email",
                label: "Email",
                value: "nadia.putri@example.com",
                order: 2,
            },
            {
                key: "phone",
                label: "Phone",
                value: "+62 812-1234-5678",
                order: 3,
            },
            { key: "domicile", label: "Domicile", value: "Jakarta", order: 4 },
            { key: "gender", label: "Gender", value: "Female", order: 5 },
            {
                key: "linkedin_link",
                label: "LinkedIn",
                value: "https://linkedin.com/in/nadiaputri",
                order: 6,
            },
        ],
    },
    {
        id: "cand_20251008_0002",
        attributes: [
            {
                key: "full_name",
                label: "Full Name",
                value: "Budi Santoso",
                order: 1,
            },
            {
                key: "email",
                label: "Email",
                value: "budi.santoso@example.com",
                order: 2,
            },
            {
                key: "phone",
                label: "Phone",
                value: "+62 821-9876-5432",
                order: 3,
            },
            { key: "domicile", label: "Domicile", value: "Bandung", order: 4 },
            { key: "gender", label: "Gender", value: "Male", order: 5 },
            {
                key: "linkedin_link",
                label: "LinkedIn",
                value: "https://linkedin.com/in/budisantoso",
                order: 6,
            },
        ],
    },
    {
        id: "cand_20251008_0003",
        attributes: [
            {
                key: "full_name",
                label: "Full Name",
                value: "Siti Nurhaliza",
                order: 1,
            },
            {
                key: "email",
                label: "Email",
                value: "siti.nurhaliza@example.com",
                order: 2,
            },
            {
                key: "phone",
                label: "Phone",
                value: "+62 813-5555-7777",
                order: 3,
            },
            { key: "domicile", label: "Domicile", value: "Surabaya", order: 4 },
            { key: "gender", label: "Gender", value: "Female", order: 5 },
            {
                key: "linkedin_link",
                label: "LinkedIn",
                value: "https://linkedin.com/in/sitinurhaliza",
                order: 6,
            },
        ],
    },
];
