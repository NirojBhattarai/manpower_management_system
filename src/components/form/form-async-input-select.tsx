import React from "react";
import { useField, ErrorMessage } from "formik";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { GroupBase } from "react-select";
import { useLazyGetDataQuery } from "@/api/api";

export interface IOption<T = string | number> {
  label: string;
  value: T;
}

interface IAsyncSelectProps {
  name: string;
  label: string;
  fetchUrl: string;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
  disabled?: boolean;
  dependedValueKey?: string;
  dependedValue?: string;
}

type Additional = {
  page: number;
};

const FormAsyncInputSelect: React.FC<IAsyncSelectProps> = ({
  name,
  label,
  fetchUrl,
  labelKey = "name",
  valueKey = "id",
  placeholder = "Select...",
  disabled,
  dependedValueKey,
  dependedValue,
}) => {
  const [field, meta, helpers] = useField(name);
  const [trigger] = useLazyGetDataQuery();

  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null,
  );

  const loadOptions: LoadOptions<
    IOption,
    GroupBase<IOption>,
    Additional
  > = async (search, _loadedOptions, additional) => {
    const page = additional?.page ?? 1;

    const params: Record<string, any> = { page, perPage: 5, search };
    if (dependedValueKey && dependedValue)
      params[dependedValueKey] = dependedValue;

    const res: any = await trigger({ url: fetchUrl, params }).unwrap();
    const response = res?.data;

    function getNested(obj: any, path: string) {
      return path.split(".").reduce((acc, key) => acc?.[key], obj);
    }

    const options: IOption[] = response.records.map((item: any) => ({
      label: getNested(item, labelKey) ?? String(item.id),
      value: getNested(item, valueKey) ?? item.id,
    }));

    return {
      options,
      hasMore: page < response.totalPages,
      additional: { page: page + 1 },
    };
  };

  React.useEffect(() => {
    if (!field.value) {
      setSelectedOption(null);
      return;
    }

    if (selectedOption?.value === field.value) return;

    let isCancelled = false;

    const fetchLabel = async () => {
      try {
        let record: any = null;

        const getNested = (obj: any, path: string) =>
          path.split(".").reduce((acc, key) => acc?.[key], obj);

        if (valueKey === "id") {
          try {
            const res: any = await trigger({
              url: `${fetchUrl}/${field.value}`,
            }).unwrap();
            record = res?.data;
          } catch (err) {
            record = null;
          }

          if (!record) {
            const params: Record<string, any> = { page: 1, perPage: 50 };
            if (dependedValueKey && dependedValue)
              params[dependedValueKey] = dependedValue;
            const resList: any = await trigger({
              url: fetchUrl,
              params,
            }).unwrap();
            const records = resList?.data?.records || [];
            record = records.find(
              (r: any) => getNested(r, valueKey) === field.value,
            );
          }
        } else {
          const res: any = await trigger({ url: fetchUrl }).unwrap();
          const records = res?.data?.records || [];
          record = records.find(
            (r: any) => getNested(r, valueKey) === field.value,
          );
        }

        const option = record
          ? {
              label: getNested(record, labelKey) ?? String(field.value),
              value: field.value,
            }
          : { label: String(field.value), value: field.value };

        if (!isCancelled) setSelectedOption(option);
      } catch (err) {
        if (!isCancelled)
          setSelectedOption({ label: String(field.value), value: field.value });
      }
    };

    fetchLabel();

    return () => {
      isCancelled = true;
    };
  }, [
    field.value,
    fetchUrl,
    labelKey,
    valueKey,
    trigger,
    dependedValueKey,
    dependedValue,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <label className="typography-input-label">{label}</label>

      <AsyncPaginate<IOption, GroupBase<IOption>, Additional>
        value={selectedOption}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        debounceTimeout={400}
        isClearable
        isSearchable
        isDisabled={disabled}
        placeholder={placeholder}
        menuPlacement="auto"
        cacheUniqs={[fetchUrl, dependedValue]}
        onChange={(option) => {
          const selected = option as IOption;
          setSelectedOption({
            value: selected.value,
            label: selected.label ?? String(selected.value),
          });
          helpers.setValue(selected.value);
        }}
        onBlur={() => helpers.setTouched(true)}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "36px",
            height: "36px",
            borderRadius: "8px",
            borderColor: state.isFocused
              ? "#6a7282"
              : meta.touched && meta.error
                ? "#ef4444"
                : "#e5e7eb",
            boxShadow: "none",
            fontSize: "12px",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 10px",
            fontSize: "12px",
          }),
          input: (base) => ({
            ...base,
            fontSize: "12px",
            margin: 0,
            padding: 0,
          }),
          singleValue: (base) => ({ ...base, fontSize: "12px" }),
          placeholder: (base) => ({ ...base, fontSize: "12px" }),
          menu: (base) => ({ ...base, zIndex: 20, borderRadius: "8px" }),
          menuList: (base) => ({
            ...base,
            maxHeight: "120px",
            overflowY: "auto",
            padding: 0,
          }),
          option: (base, state) => ({
            ...base,
            fontSize: "12px",
            padding: "8px 10px",
            backgroundColor: state.isSelected
              ? "#a4b4f5"
              : state.isFocused
                ? "#c8d2fa"
                : "white",
            color: "#111827",
            cursor: "pointer",
          }),
        }}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormAsyncInputSelect;
