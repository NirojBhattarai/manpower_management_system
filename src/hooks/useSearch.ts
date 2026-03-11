import { useSearchParams } from "react-router-dom";

export type QueryValue = string | null | undefined;
const SEARCH_PARAMS = "search";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const get = (): string => {
    return searchParams.get(SEARCH_PARAMS) ?? "";
  };

  const set = (value: QueryValue) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value === undefined || value === null || value === "") {
        params.delete(SEARCH_PARAMS);
      } else {
        params.set(SEARCH_PARAMS, value);
      }

      return params;
    });
  };

  return {
    get,
    set,
  };
};

export default useSearch;
