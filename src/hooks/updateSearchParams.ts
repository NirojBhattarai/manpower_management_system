import { useSearchParams } from "react-router-dom";

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = (
    newParams: Record<string, string>,
    deleteParams?: string[]
  ) => {
    deleteParams?.forEach((key) => {
      searchParams.delete(key);
    });
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, ...newParams });
  };
  return updateParams;
};

export const useDeleteSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deleteParams = (keysToDelete: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    keysToDelete.forEach((key) => {
      newParams.delete(key);
    });
    setSearchParams(newParams);
  };
  return deleteParams;
};

export const useGetSearchParams = () => {
  const [searchParams] = useSearchParams();
  const getSearchParamsValue = (key: string, defaultValue?: string | null) => {
    return searchParams.get(key) ?? defaultValue;
  };
  return getSearchParamsValue;
};

export const useValidatedSearchParam = <T extends readonly string[]>(
  key: string,
  allowedValues: T,
  defaultValue: T[number]
): T[number] => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(key);

  if (value && allowedValues.includes(value)) {
    return value as T[number];
  }

  return defaultValue;
};
