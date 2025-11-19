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
    const allSelected =
        candidates.length > 0 &&
        selectedCandidates.length === candidates.length;

    return (
        <div className="overflow-x-auto rounded-lg border border-neutral-20">
            <table className="min-w-full bg-white">
                <thead className="bg-neutral-10">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider w-12">
                            <div className="flex items-center justify-center">
                                <SquareCheckIcon
                                    checked={allSelected}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        candidates.forEach((candidate) => {
                                            onSelectCandidate(
                                                candidate.id,
                                                isChecked
                                            );
                                        });
                                    }}
                                />
                            </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            NAMA LENGKAP
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            EMAIL ADDRESS
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            PHONE NUMBERS
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            DATE OF BIRTH
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            DOMICILE
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            GENDER
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-70 uppercase tracking-wider">
                            LINK LINKEDIN
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-20">
                    {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-neutral-5">
                            <td className="px-4 py-4">
                                <div className="flex items-center justify-center">
                                    <SquareCheckIcon
                                        checked={selectedCandidates.includes(
                                            candidate.id
                                        )}
                                        onChange={(e) =>
                                            onSelectCandidate(
                                                candidate.id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-neutral-100">
                                {candidate.fullName}
                            </td>
                            <td className="px-4 py-4 text-sm text-neutral-90">
                                {candidate.email}
                            </td>
                            <td className="px-4 py-4 text-sm text-neutral-90">
                                {candidate.phone}
                            </td>
                            <td className="px-4 py-4 text-sm text-neutral-90">
                                {candidate.dateOfBirth || "-"}
                            </td>
                            <td className="px-4 py-4 text-sm text-neutral-90">
                                {candidate.domicile}
                            </td>
                            <td className="px-4 py-4 text-sm text-neutral-90">
                                {candidate.gender}
                            </td>
                            <td className="px-4 py-4 text-sm">
                                <a
                                    href={candidate.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-main hover:underline"
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
