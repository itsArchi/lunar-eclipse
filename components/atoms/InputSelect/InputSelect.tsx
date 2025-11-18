import { useState } from "react";
import { Input } from "../../atoms/Input/Input";
import clsx from "clsx";
export interface InputSelectItemProps {
    id: string;
    label: string;
}

interface InputSelectProps {
    items?: InputSelectItemProps[];
    placeholder?: string;
    label?: string;
    onSelectItems?: (selectedItems?: InputSelectItemProps[]) => void;
    onChange?: (text?: string) => void;
    required?: boolean;
    isMultiple?: boolean;
    defaultSelectedItem?: InputSelectItemProps[];
    isLoading?: boolean;
}

export const InputSelect = ({
    items,
    placeholder,
    label,
    onSelectItems,
    required = false,
    isMultiple = true,
    onChange,
    defaultSelectedItem,
    isLoading = false,
}: InputSelectProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<InputSelectItemProps[]>(
        defaultSelectedItem ?? []
    );

    const allItems = items ?? [];

    return (
        <div className="flex flex-col">
            <div className="relative" onClick={() => setOpen(!open)}>
                <Input
                    required={required}
                    label={label}
                    value={inputValue}
                    name="input-select"
                    placeholder={
                        selectedItems.length == 0
                            ? placeholder
                            : isMultiple
                            ? selectedItems.length.toString() +
                              " items selected"
                            : selectedItems[0].label
                    }
                    onChange={(e) => {
                        if (e.target.value) {
                            onChange?.(e.target.value);
                            setOpen(true);
                            setInputValue(e.target.value);

                            return;
                        }
                        onChange?.(undefined);
                        setInputValue("");
                    }}
                    onClick={() => {
                        setOpen(true);
                    }}
                    onClickSuffixIcon={() => {
                        if (open) {
                            setOpen(false);
                            setInputValue("");
                            onChange?.(undefined);
                            return;
                        }
                        setOpen(true);
                    }}
                />
                {open && !isLoading && (
                    <div className="absolute z-10 w-full  py-[10px] px-[2px] shadow bg-neutral-10 rounded-[10px] grid grid-cols gap-[10px] max-h-64 overflow-auto">
                        {allItems.map((item, index) => {
                            const findItemOnSelectedItem: InputSelectItemProps[] =
                                selectedItems?.filter(
                                    (selectedItem) => selectedItem.id == item.id
                                );
                            const isItemSelected =
                                findItemOnSelectedItem.length != 0;

                            const itemStyle = clsx({
                                "bg-bluescale-20 text-brand-primary":
                                    isItemSelected,
                                "bg-white text-neutral-90": !isItemSelected,
                            });
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        if (!isItemSelected && isMultiple) {
                                            const newItem: InputSelectItemProps =
                                                {
                                                    id: item.id,
                                                    label: item.label,
                                                };
                                            setSelectedItems([
                                                ...selectedItems,
                                                newItem,
                                            ]);
                                            onSelectItems?.([
                                                ...selectedItems,
                                                newItem,
                                            ]);
                                        }
                                        if (!isItemSelected && !isMultiple) {
                                            const newItem: InputSelectItemProps =
                                                {
                                                    id: item.id,
                                                    label: item.label,
                                                };
                                            setSelectedItems([newItem]);
                                            onSelectItems?.([newItem]);
                                            setInputValue("");
                                            setOpen(false);
                                        }
                                        if (isItemSelected) {
                                            const newSelectedItem =
                                                selectedItems.filter(
                                                    (selectedItem) =>
                                                        selectedItem.id !=
                                                        item.id
                                                );
                                            setSelectedItems(newSelectedItem);
                                            onSelectItems?.(newSelectedItem);
                                        }
                                    }}
                                    className={`px-4 py-2 cursor-pointer text-12 font-700 leading-20 text-neutral-100 hover:bg-greyscale-20 ${itemStyle}`}
                                >
                                    {item.label}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
