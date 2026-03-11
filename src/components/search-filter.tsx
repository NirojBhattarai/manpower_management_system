import SearchSection from "@/components/reusable-component/SearchSection";
import useSearch from "@/hooks/useSearch";
import { DateRangePicker } from "./shadcn/DateFilterRange";
import { useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { Download, Funnel, Move, Plus } from "lucide-react";
import {
  useDeleteSearchParams,
  useGetSearchParams,
  useUpdateSearchParams,
} from "@/hooks/updateSearchParams";
import { SelectFilter } from "./shadcn/SelectFilter";
import { IOption } from "./form/form-input-select";

interface IMoveToModule {
  moduleName: string;
  handleClick: () => void;
}

const SearchFilter = ({
  searchFilter = true,
  dateFilter = false,
  selectFilter,
  handleAddClick,
  moveToModule,
}: {
  searchFilter?: boolean;
  dateFilter?: boolean;
  selectFilter?: {
    placeholder: string;
    option: IOption[];
    paramsKey: string;
  }[];
  handleAddClick?: () => void;
  moveToModule?: IMoveToModule;
}) => {
  const updateSearchParams = useUpdateSearchParams();
  const deleteSearchParams = useDeleteSearchParams();
  const getSearchParams = useGetSearchParams();

  const isFilterActive = getSearchParams("filter");
  const handleFilterClick = () => {
    if (getSearchParams("filter") === "active") deleteSearchParams(["filter"]);
    else updateSearchParams({ filter: "active" });
  };
  return (
    <React.Fragment>
      <ActionButton
        searchFilter={searchFilter}
        handleAddClick={handleAddClick}
        handleClickFilter={handleFilterClick}
        moveT0Module={moveToModule}
        showFilterButton={dateFilter || !!selectFilter?.length}
      />

      {/* Filter Component  */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isFilterActive
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <DynamicFilter selectFilter={selectFilter} dateFilter={dateFilter} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchFilter;

// Components
const ActionButton = ({
  searchFilter,
  handleClickFilter,
  moveT0Module,
  handleAddClick,
  showFilterButton = false,
  showExportButton = false,
}: {
  searchFilter?: boolean;
  handleClickFilter: () => void;
  moveT0Module?: IMoveToModule;
  handleAddClick?: () => void;
  showFilterButton?: boolean;
  showExportButton?: boolean;
}) => {
  const search = useSearch();
  return (
    <div
      className={`flex ${searchFilter ? "justify-between" : "justify-end"} items-center my-2.5`}
    >
      {searchFilter && (
        <SearchSection
          search={search.get()}
          setSearch={search.set}
          styleClass="w-72 h-10 rounded-full bg-white"
        />
      )}
      <div className="flex items-center gap-x-2">
        {moveT0Module && (
          <button
            onClick={(e) => {
              e.preventDefault();
              moveT0Module?.handleClick();
            }}
            className="flex items-center gap-x-2 hover:bg-secondary-500 px-3 py-1 border border-text-50 rounded-4xl text-text-600 hover:text-white transition-all duration-500 ease-in-out cursor-pointer typo-mid-bd-reg"
          >
            Move To {moveT0Module?.moduleName}
            <Move size={16} />
          </button>
        )}
        {showFilterButton && (
          <button
            onClick={handleClickFilter}
            className="flex items-center gap-x-2 hover:bg-secondary-500 px-3 py-1 border border-text-50 rounded-4xl text-text-600 hover:text-white transition-all duration-500 ease-in-out cursor-pointer typo-mid-bd-reg"
          >
            <Funnel size={16} />
            Filter
          </button>
        )}

        {showExportButton && (
          <button className="flex items-center gap-x-2 hover:bg-secondary-500 px-3 py-1 border border-text-50 rounded-4xl text-text-600 hover:text-white transition-all duration-500 ease-in-out cursor-pointer typo-mid-bd-reg">
            <Download size={16} />
            Export
          </button>
        )}

        {handleAddClick && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddClick();
            }}
            className="flex items-center gap-x-2 bg-secondary-500 hover:bg-secondary-700 px-3 py-1 rounded-4xl text-white transition-all duration-500 ease-in-out cursor-pointer typo-mid-bd-reg"
          >
            <Plus size={16} />
            Add
          </button>
        )}
      </div>
    </div>
  );
};

// Filter Component
const DynamicFilter = ({
  dateFilter,
  selectFilter,
}: {
  dateFilter: boolean;
  selectFilter?: {
    placeholder: string;
    option: IOption[];
    paramsKey: string;
  }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (fromParam && toParam) {
      return {
        from: parseISO(fromParam),
        to: parseISO(toParam),
      };
    }
    return undefined;
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    const params = new URLSearchParams(searchParams);

    if (!range?.from || !range?.to) {
      params.delete("from");
      params.delete("to");
    } else {
      params.set("from", format(range.from, "yyyy-MM-dd"));
      params.set("to", format(range.to, "yyyy-MM-dd"));
    }

    setSearchParams(params);
  };
  return (
    <div className="flex justify-between items-center">
      {/* Date Range Filter */}
      {dateFilter && (
        <DateRangePicker onChange={handleDateChange} value={dateRange} />
      )}
      <div className="flex items-center gap-x-2">
        {selectFilter?.map((item) => (
          <SelectFilter
            key={item?.paramsKey}
            paramsKey={item?.paramsKey}
            placeHolder={item?.placeholder}
            option={item.option}
          />
        ))}
      </div>
    </div>
  );
};
