import { useState, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import useSearch from "@/hooks/useSearch";

interface ISearchBoxProps {
  placeholder?: string;
  className?: string;
}

const SearchBox = ({ placeholder = "Search", className }: ISearchBoxProps) => {
  const { get, set } = useSearch();
  const [inputValue, setInputValue] = useState(get());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 0 || value.length >= 2) {
      set(value);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-secondary-text h-4 w-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={cn(
          "border border-[#868FA029] rounded-lg px-4 py-2 text-secondary-text font-normal pl-7 text-sm min-w-[280px] focus:outline-none",
          className
        )}
      />
    </div>
  );
};

export default SearchBox;
