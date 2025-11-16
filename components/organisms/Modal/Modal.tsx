import { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import JobForm from "../../molecules/Form/JobForm";
import CrossIcon from "../../../public/assets/icon/Cross";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-[70%] h-full max-h-[85vh] flex flex-col">
                <div className="border-b border-neutral-40 pb-4 flex-shrink-0 flex justify-between">
                    <h5 className="text-lg font-semibold">Job Opening</h5>
                    <button
                        onClick={onClose}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <CrossIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mt-4 pr-8">
                    <JobForm />
                </div>
                <div className="flex justify-end pr-8 border-t pt-4">
                    <Button
                        onClick={onClose}
                        type="primary"
                    >Publish Job</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
