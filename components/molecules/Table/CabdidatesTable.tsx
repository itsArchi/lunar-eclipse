import SquareCheckIcon from "../../../public/assets/icon/SquareCheck";

interface Candidate {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    domicile: string;
    gender: string;
    linkedin: string;
}

interface CandidateTableProps {
    candidates: Candidate[];
    onSelectCandidate: (id: string, selected: boolean) => void;
    selectedCandidates: string[];
}

const CandidateTable = ({
    candidates,
    onSelectCandidate,
    selectedCandidates,
}: CandidateTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-neutral-10">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            <SquareCheckIcon
                            // checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                            // onChange={(e) => {
                            //     const isChecked = e.target.checked;
                            //     candidates.forEach(candidate => {
                            //         onSelectCandidate(candidate.id, isChecked);
                            //     });
                            // }}
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            NAMA LENGKAP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            EMAIL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            PHONE NUMBERS
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            DATE OF BIRTH
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            DOMIC
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            GENDER
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            LINK LINKEDIN
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-neutral-5">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <SquareCheckIcon
                                // checked={selectedCandidates.includes(candidate.id)}
                                // onChange={(e) => onSelectCandidate(candidate.id, e.target.checked)}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.fullName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.dateOfBirth}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.domicile}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-90">
                                {candidate.gender}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-main">
                                <a
                                    href={candidate.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    View Profile
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateTable;
