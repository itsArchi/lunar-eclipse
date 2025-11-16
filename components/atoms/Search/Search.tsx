import SearchIcon from "../../../public/assets/icon/Search";

const Search = ({
    onChange,
    value,
    className,
}: {
    onChange: (value: string) => void;
    value: string;
    className?: string;
}) => {
    return (
        <div className="relative w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 !text-neutral-60" />
            </div>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:border-transparent placeholder:text-sm text-sm text-brand-black placeholder:opacity-50 placeholder:text-brand-black ${className}`}
            />
        </div>
    );
};

export default Search;
