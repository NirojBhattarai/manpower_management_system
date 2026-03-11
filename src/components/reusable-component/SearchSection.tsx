import { QueryValue } from "@/hooks/useSearch";
import { Search } from "lucide-react";
import type React from "react";

const SearchSection = ({
  styleClass,
  search,
  setSearch,
}: {
  styleClass?: string;
  search: string;
  setSearch: (value: QueryValue) => void;
}) => {
  return (
    <div
      className={`flex items-center px-4 bg-white border border-text-50 rounded-4xl max-w-md ${styleClass}`}
    >
      <Search size={14} className="mr-3 text-gray-400" />
      <input
        type="text"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
        className="typo-mid-bd-light py-2 placeholder:text-black-300 text-black-300 focus:outline-none"
      />
    </div>
  );
};

export default SearchSection;
