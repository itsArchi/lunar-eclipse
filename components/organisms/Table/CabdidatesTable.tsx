import React from "react";
import SquareCheckIcon from "../../../public/assets/icon/SquareCheck";
import { Candidate } from "../../../utils/types/candidate";

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

    const getAttributeValue = (candidate: any, key: string) => {
        if (candidate?.metadata?.map && candidate.metadata.map[key]) {
            return candidate.metadata.map[key];
        }
        if (candidate[key]) return candidate[key];
        const attrs: any[] =
            candidate?.metadata?.attributes || candidate?.attributes || [];
        const attr = attrs.find(
            (a) =>
                a.key === key ||
                a.key === `${key}_link` ||
                (a.key === "linkedin_link" && key === "linkedin")
        );
        return attr ? attr.value : "-";
    };

    return (
        <div className="rounded-lg border border-neutral-20 bg-white shadow-sm font-nunito">
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed text-sm">
                    <thead className="bg-neutral-10">
                        <tr>
                            <th className="w-12 px-4 py-3 text-left">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            candidates.forEach((c) =>
                                                onSelectCandidate(c.id, checked)
                                            );
                                        }}
                                        className="h-5 w-5 rounded-md border border-primary-main text-primary-main focus:ring-0"
                                    />
                                </div>
                            </th>

                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                NAMA LENGKAP
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                EMAIL ADDRESS
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                PHONE NUMBERS
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                DATE OF BIRTH
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                DOMICILE
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                GENDER
                            </th>
                            <th className="px-4 py-3 text-left text-12  text-neutral-100 leading-20 font-700">
                                LINK LINKEDIN
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-20">
                        {candidates.map((candidate) => (
                            <tr
                                key={candidate.id}
                                className="hover:bg-neutral-5"
                            >
                                {/* checkbox */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCandidates.includes(
                                                candidate.id
                                            )}
                                            onChange={(e) =>
                                                onSelectCandidate(
                                                    candidate.id,
                                                    e.target.checked
                                                )
                                            }
                                            className="h-5 w-5 rounded-md border-neutral-200 text-primary-main focus:ring-0"
                                        />
                                    </div>
                                </td>

                                {/* full name */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    {candidate.full_name ||
                                        getAttributeValue(
                                            candidate,
                                            "full_name"
                                        ) ||
                                        "-"}
                                </td>

                                {/* email (truncate) */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    <div className="">
                                        {candidate.email ||
                                            getAttributeValue(
                                                candidate,
                                                "email"
                                            ) ||
                                            "-"}
                                    </div>
                                </td>

                                {/* phone */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    {candidate.phone ||
                                        getAttributeValue(candidate, "phone") ||
                                        "-"}
                                </td>

                                {/* date of birth - if you don't have dob, keep placeholder */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    {getAttributeValue(candidate, "dob") ||
                                        "30 January 2001"}
                                </td>

                                {/* domicile */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    {candidate.domicile ||
                                        getAttributeValue(
                                            candidate,
                                            "domicile"
                                        ) ||
                                        "-"}
                                </td>

                                {/* gender */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    {candidate.gender ||
                                        getAttributeValue(
                                            candidate,
                                            "gender"
                                        ) ||
                                        "-"}
                                </td>

                                {/* linkedin (teal color + truncate) */}
                                <td className="px-4 py-4 text-14 font-400 text-neutral-90 leading-24">
                                    <div className=" truncate">
                                        <a
                                            href={
                                                candidate.linkedin ||
                                                getAttributeValue(
                                                    candidate,
                                                    "linkedin"
                                                ) ||
                                                "#"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-main hover:underline"
                                        >
                                            {candidate.linkedin ||
                                                getAttributeValue(
                                                    candidate,
                                                    "linkedin"
                                                ) ||
                                                "-"}
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateTable;
