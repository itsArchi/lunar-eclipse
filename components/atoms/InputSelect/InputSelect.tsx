import { useState, useRef, useEffect } from "react";
import { Input } from "../../atoms/Input/Input";
import clsx from "clsx";

interface Country {
    code: string;
    name: string;
    flag: string;
    dialCode: string;
}

const countries: Country[] = [
    { code: "ID", name: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
    { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
    { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
    { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
    { code: "TH", name: "Thailand", flag: "🇹🇭", dialCode: "+66" },
    { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
];

interface PhoneInputProps {
    name: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function PhoneInput({
    name,
    label,
    required = false,
    placeholder = "812-3456-7890",
    value = "",
    onChange,
    className = "",
}: PhoneInputProps) {
    const [inputValue, setInputValue] = useState(() => {
        const match = value.match(/^\+\d+/);
        if (match) {
            return value.replace(match[0], "");
        }
        return value.replace(/^\+62/, "");
    });

    const [selectedCountry, setSelectedCountry] = useState<Country>(
        countries[0]
    );
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowCountryDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setShowCountryDropdown(false);
        const newPhoneValue = country.dialCode + inputValue;
        onChange?.(newPhoneValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/\D/g, "");
        if (
            selectedCountry.code === "ID" &&
            newValue &&
            !newValue.startsWith("8")
        ) {
            newValue = "8" + newValue;
        }
        setInputValue(newValue);
        const fullPhoneValue = selectedCountry.dialCode + newValue;
        onChange?.(fullPhoneValue);
    };

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-neutral-100 mb-2">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <div className="relative">
                <div className="absolute left-0 top-0 h-full flex items-center pl-3">
                    <span className="text-lg">{selectedCountry.flag}</span>
                </div>

                <div
                    className="absolute left-12 top-0 h-full flex items-center  border-l"
                    ref={dropdownRef}
                >
                    <button
                        type="button"
                        onClick={() =>
                            setShowCountryDropdown(!showCountryDropdown)
                        }
                        className="flex items-center gap-1 px-2 py-2 hover:bg-neutral-10 transition-colors"
                    >
                        <span className="text-xs text-neutral-90">
                            {selectedCountry.dialCode}
                        </span>
                        <svg
                            className={`w-3 h-3 text-neutral-60 transition-transform ${
                                showCountryDropdown ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Country Dropdown */}
                    {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-40 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                            {countries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountryChange(country)}
                                    className="w-full px-3 py-2 flex items-center gap-2 hover:bg-neutral-10 transition-colors text-left"
                                >
                                    <span className="text-lg">
                                        {country.flag}
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-neutral-90">
                                            {country.name}
                                        </div>
                                        <div className="text-xs text-neutral-60">
                                            {country.dialCode}
                                        </div>
                                    </div>
                                    {selectedCountry.code === country.code && (
                                        <svg
                                            className="w-4 h-4 text-primary-main"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <input
                    type="tel"
                    name={name}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 pl-24 border border-neutral-40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent"
                />
            </div>
        </div>
    );
}

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
                                "bg-bluescale-20 text-neutral-90":
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
