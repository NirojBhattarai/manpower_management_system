import { useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

  const date = value;

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      onChange?.(undefined);
      setIsSelectingEndDate(false);
      return;
    }

    if (!date?.from || !isSelectingEndDate) {
      onChange?.({ from: range.from, to: undefined });
      setIsSelectingEndDate(true);
    } else {
      if (range.from && range.to) {
        onChange?.(range);
        setOpen(false);
        setIsSelectingEndDate(false);
      } else if (range.from) {
        onChange?.({ from: range.from, to: undefined });
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setIsSelectingEndDate(false);
    }
  };

  const formatted =
    date?.from && date?.to
      ? `${format(date.from, "MMM dd, yyyy")} - ${format(
          date.to,
          "MMM dd, yyyy"
        )}`
      : date?.from
      ? `${format(date.from, "MMM dd, yyyy")} - Select end date`
      : "Date Filter";

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-67.5 h-11 justify-between text-left font-normal bg-white p-3 border text-sm border-tertiary-50 rounded-full px-6 cursor-pointer",
              !date?.from && "text-black"
            )}
          >
            <span className="text-black-300 typo-mid-bd-light">
              {formatted}
            </span>
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
          </Button>
        </PopoverTrigger>

        <div className="absolute top-3.5 right-12">
          {date?.from && date?.to && (
            <X
              className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
                setIsSelectingEndDate(false);
              }}
            />
          )}
        </div>
      </div>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          initialFocus
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
