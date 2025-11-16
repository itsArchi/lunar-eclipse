import { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import Modal from "../../organisms/Modal/Modal";

const CardAsideJob = ({ className }: { className?: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div
            className={`relative bg-backdropJob bg-cover rounded-2xl p-6 flex flex-col gap-6 ${className}`}
        >
            <div className="absolute inset-0 bg-[#000000B8] rounded-2xl"></div>
            <div className="relative z-10">
                <h5 className="text-18 font-700 leading-28 text-neutral-40">
                    Recruit the best candidates
                </h5>
                <h6 className="text-14 font-700 leading-24 text-neutral-10">
                    Create jobs, invite, and hire with ease
                </h6>
            </div>
            <Button
                type="primary"
                size="lg"
                className="text-16 font-700 leading-28 text-neutral-10 relative z-10"
                onClick={handleOpenModal}
            >
                Create a new job
            </Button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
    );
};

export default CardAsideJob;
