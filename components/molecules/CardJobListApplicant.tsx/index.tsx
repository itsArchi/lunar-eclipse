import MapPinIcon from "../../../public/assets/icon/MapPin";
import BankNoteIcon from "../../../public/assets/icon/BankNote";
import { LogoIcon } from "../../atoms/LogoIcon/LogoIcon";

const CardJobListApplicant = ({
    title,
    company,
    location,
    salary,
    onClick,
    className,
}: {
    title: string;
    company: string;
    location?: string;
    salary?: string;
    onClick?: () => void;
    className?: string;
}) => {
    return (
        <div
            className={`flex flex-col font-nunito bg-neutral-20 rounded-lg py-3 px-4 gap-2 w-full cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className="border-b flex gap-4 pb-4 border-dashed">
                <div className="border flex justify-center items-center pb-2 px-1 rounded-md">
                    <LogoIcon size="sm" />
                </div>
                <div>
                    <h5 className="text-16 font-700 leading-28 text-neutral-90">
                        {title}
                    </h5>
                    <h6 className="text-14 font-400 leading-24 text-neutral-90">
                        {company}
                    </h6>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <MapPinIcon />
                <p className="text-12 font-400 leading-20 text-neutral-80">
                    {location}
                </p>
            </div>
            <div className="flex gap-2 items-center">
                <BankNoteIcon />
                <p className="text-12 font-400 leading-20 text-neutral-80">
                    {salary}
                </p>
            </div>
        </div>
    );
};

export default CardJobListApplicant;
