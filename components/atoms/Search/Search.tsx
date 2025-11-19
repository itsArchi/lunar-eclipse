import SearchIcon from "../../../public/assets/icon/Search";

const Search = ({
    onChange,
    value,
    className,
    placeholder,
}: {
    onChange: (value: string) => void;
    value: string;
    className?: string;
    placeholder?: string;
}) => {
    return (
        <div className="relative w-full max-h-10">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                className={`w-full pl-2 pr-4 py-2 border-2 border-neutral-30 rounded-lg focus:ring-2 focus:border-transparent placeholder:text-14 text-14 text-neutral-100 placeholder:opacity-50 placeholder:text-neutral-800 ${className}`}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <SearchIcon className="h-6 w-6 !text-primary-main" />
            </div>
        </div>
    );
};

export default Search;
