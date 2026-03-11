import useQueryParams from "./use-query-params";

type KeyValue = string | number | boolean;

export const useQueryParamState = (key: string, defaultValue?: KeyValue) => {
  const { getQueryParams, updateQueryParams, deleteQueryParams } =
    useQueryParams();

  // read value from query param, fallback to default
  const value = getQueryParams(key) ?? defaultValue;

  // setter
  const setValue = (val: KeyValue) => {
    updateQueryParams({ [key]: String(val) });
  };

  // remover
  const clearValue = () => {
    deleteQueryParams([key]);
  };

  // convenience boolean flag for "open" or "active" style params
  const isActive = Boolean(value);

  return {
    value,
    setValue,
    clearValue,
    isActive,
  };
};
