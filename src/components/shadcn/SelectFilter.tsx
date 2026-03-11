import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteSearchParams,
  useGetSearchParams,
  useUpdateSearchParams,
} from "@/hooks/updateSearchParams";
import { X } from "lucide-react";

interface IOption {
  label: string;
  value: string | number;
}

export function SelectFilter({
  option,
  placeHolder = "Select...",
  paramsKey,
}: {
  option: IOption[];
  placeHolder?: string;
  paramsKey: string;
}) {
  const updateParams = useUpdateSearchParams();
  const deleteParams = useDeleteSearchParams();
  const getValue = useGetSearchParams();

  const selectedValue = getValue(paramsKey);

  const handleChangeParams = (value: string) => {
    updateParams({ [paramsKey]: value });
  };

  const handleDeleteFilter = () => {
    deleteParams([paramsKey]);
  };

  return (
    <div className="relative">
      <Select
        key={selectedValue ?? "empty"}
        value={selectedValue ?? undefined}
        onValueChange={(val) => handleChangeParams(val)}
      >
        <SelectTrigger className="rounded-2xl w-45">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeHolder}</SelectLabel>

            {option?.map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="top-1/2 right-8 absolute -translate-y-1/2">
        {selectedValue && (
          <X
            className="opacity-50 size-4 text-red-500 cursor-pointer"
            onClick={() => {
              handleDeleteFilter();
            }}
          />
        )}
      </div>
    </div>
  );
}
