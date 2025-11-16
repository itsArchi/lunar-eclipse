import clsx from "clsx";
import {
    ChangeEventHandler,
    JSX,
    MouseEventHandler,
    forwardRef,
    useCallback,
    useState,
} from "react";
import RemoveRedEye from "../../../public/assets/image/RemoveEye";

interface InputPros {
    ref?: any;
    name: string;
    label?: string;
    required?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    type?: "text" | "password" | "number";
    inputType?: "basic" | "dropdown-select";
    dropdownItems?: Array<string>;
    state?: "normal" | "error";
    maxLength?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: any;
    onFocus?: any;
    onInput?: Function;
    isDisabled?: boolean;
    placeholder?: string;
    errorMessage?: string;
    suffixIcon?: JSX.Element;
    onClickSuffixIcon?: MouseEventHandler<HTMLDivElement>;
    pattern?: string;
}

const InputElement = (
    {
        name,
        label,
        required = false,
        value,
        defaultValue,
        type,
        inputType = "basic",
        dropdownItems,
        state = "normal",
        maxLength,
        isDisabled,
        onChange,
        onBlur,
        onFocus,
        onInput,
        placeholder,
        errorMessage,
        suffixIcon,
        onClickSuffixIcon,
        pattern,
    }: InputPros,
    ref: any
) => {
    const [hidePassword, setHidePassword] = useState(false);

    const handleOnInput = useCallback(
        (e: any) => {
            onInput?.(e);
        },
        [onInput]
    );

    const conditionalStyle = clsx({
        "bg-greyscale-20 cursor-not-allowed": isDisabled,
        "bg-bluescale-20 hover:bg-accent-white focus:bg-[#F2F2F2]": !isDisabled,
        "border border-accent-red": state === "error",
    });

    const baseStyle = `
      flex h-10 w-full rounded-md border-[1px] border-input bg-background px-2 py-2 text-neutral-90 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-80 focus:outline-none
      shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
      ${conditionalStyle}
  `;
    return (
        <div className="m-1 font-nunito">
            <div className="flex mb-1">
                <label className="text-12 leading-20 font-400 text-neutral-90">
                    {label}
                </label>
                {required && <label className="text-accent-red">*</label>}
            </div>
            <div className="flex">
                {(inputType === "basic" || inputType === "dropdown-select") && (
                    <div className="relative w-full h-fit">
                        <input
                            name={name}
                            defaultValue={defaultValue}
                            value={value}
                            type={
                                type === "password" && hidePassword
                                    ? "text"
                                    : type
                            }
                            maxLength={maxLength}
                            placeholder={placeholder}
                            required={required}
                            onChange={(e) => {
                                onChange?.(e);
                            }}
                            onFocus={onFocus}
                            onInput={handleOnInput}
                            onBlur={onBlur}
                            className={baseStyle}
                            disabled={isDisabled}
                            ref={ref}
                            pattern={pattern}
                        />
                        {type === "password" && (
                            <div className="absolute inset-y-0 right-0 flex flex-col justify-center h-full mr-4">
                                <div
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() =>
                                        setHidePassword(!hidePassword)
                                    }
                                >
                                    <RemoveRedEye className="fill-[#828282]" />
                                </div>
                            </div>
                        )}
                        {suffixIcon && (
                            <div className="absolute inset-y-0 right-0 flex flex-col justify-center h-full mr-4">
                                <div
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={onClickSuffixIcon}
                                >
                                    {suffixIcon}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {inputType === "dropdown-select" && (
                    <>
                        <input
                            type="text"
                            className={baseStyle}
                            disabled={isDisabled}
                            placeholder={placeholder}
                        />
                        <datalist
                            id="countries"
                            className="absolute overflow-y-auto"
                        >
                            <option selected disabled>
                                {placeholder}
                            </option>
                            {dropdownItems &&
                                dropdownItems.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                        </datalist>
                    </>
                )}
            </div>
            {state == "error" && (
                <p className="font-nunito text-12 leading-20 text-accent-red">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export const Input = forwardRef<HTMLInputElement, InputPros>(InputElement);
