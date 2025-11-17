import Image from "next/image";
import { Button } from "../../atoms/Button/Button";
import empty from "../../../public/assets/image/empty.svg";

interface EmptyJobProps {
    onClick: () => void;
}

const EmptyJob = ({ onClick }: EmptyJobProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 max-w-[82%] min-h-[100%] mt-16">
            <Image src={empty} width={300} height={300} alt="empty" />
            <h5 className="text-20 font-700 leading-32 text-neutral-90">
                No job openings available
            </h5>
            <p className="text-16 font-400 leading-28 text-neutral-90">
                Create a job opening now and start the candidate process.
            </p>

            <Button
                type="secondary"
                size="lg"
                className="text-16 font-700 leading-28 text-neutral-90"
                onClick={onClick}
            >
                Create a new job
            </Button>
        </div>
    );
};

export default EmptyJob;
