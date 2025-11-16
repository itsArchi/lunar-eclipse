import { useState } from "react";
import { Button } from "../../atoms/Button/Button";

type ChipState = "mandatory" | "optional" | "off";

interface MultiChipProps {
    value?: ChipState;
    onChange?: (state: ChipState) => void;
    optionalDisabled?: boolean;
    offDisabled?: boolean;
}

export const MultiChip = ({
    value = "mandatory",
    onChange,
    optionalDisabled = false,
    offDisabled = false,
}: MultiChipProps) => {
    const [selectedState, setSelectedState] = useState<ChipState>(value);

    const handleChipClick = (state: ChipState) => {
        setSelectedState(state);
        onChange?.(state);
    };

    return (
        <div className="flex gap-2">
            <Button
                type="outline"
                size="sm"
                rounded="full"
                className={`text-12 !font-400 leading-20 ${
                    selectedState === "mandatory"
                        ? "border-primary-main text-primary-main"
                        : "text-neutral-90"
                }`}
                onClick={() => handleChipClick("mandatory")}
            >
                Mandatory
            </Button>
            <Button
                type="outline"
                size="sm"
                rounded="full"
                isDisabled={optionalDisabled}
                className={`text-12 !font-400 leading-20 ${
                    selectedState === "optional"
                        ? "border-primary-main text-primary-main"
                        : "text-neutral-90"
                }`}
                onClick={() => handleChipClick("optional")}
            >
                Optional
            </Button>
            <Button
                type="outline"
                size="sm"
                rounded="full"
                isDisabled={offDisabled}
                className={`text-12 !font-400 leading-20 ${
                    selectedState === "off"
                        ? "border-primary-main text-primary-main"
                        : "text-neutral-90"
                }`}
                onClick={() => handleChipClick("off")}
            >
                Off
            </Button>
        </div>
    );
};
