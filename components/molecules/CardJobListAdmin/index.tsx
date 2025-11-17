import { useRouter } from "next/router";
import { Button } from "../../atoms/Button/Button";

interface CardJobListAdminProps {
    id: string;
    startedDate: string;
    title: string;
    status: string;
    salary: string;
    cta: string;
}

const CardJobListAdmin = ({
    id,
    startedDate,
    title,
    status,
    salary,
    cta,
}: CardJobListAdminProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/job-list/${id}`);
    };
    return (
        <div
            key={id}
            className="border border-neutral-20 rounded-lg p-6 bg-white cursor-pointer"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
            <div className="flex justify-between w-full">
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-3">
                        <span
                            className={`inline-block px-4 py-1 border text-14 font-700 leading-24 rounded-lg ${
                                status === "active"
                                    ? "bg-success-surface text-success-main border-success-border"
                                    : status === "inactive"
                                    ? "bg-danger-surface text-danger-main border-danger-border"
                                    : "bg-secondary-surface text-secondary-main border-secondary-border"
                            }`}
                        >
                            {status}
                        </span>
                        <p className="text-14 font-400 leading-24 text-neutral-90 border border-neutral-40 py-1 px-4 rounded">
                            {startedDate}
                        </p>
                    </div>
                    <div className="space-y-2 pt-1">
                        <h3 className="text-18 font-700 leading-28 text-neutral-100">
                            {title}
                        </h3>
                        <p className="text-16 font-400 leading-28 text-neutral-80">
                            {salary}
                        </p>
                    </div>
                </div>
                <div className="flex items-end">
                    <Button
                        type="primary"
                        size="sm"
                        rounded="lg"
                        className="text-12 font-700 leading-20 text-neutral-10"
                    >
                        {cta}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardJobListAdmin;
