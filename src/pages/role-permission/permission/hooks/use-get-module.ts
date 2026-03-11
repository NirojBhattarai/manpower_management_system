import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

export interface IModuleListItem {
  id: string;
  user: string;
  features: string[];
}
type ModuleListResponse = IApiDetailsResponse<IModuleListItem>;

const useModuleList = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: ModuleListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.module,
    tag: apiTags.module,
  });

  return {
    moduleListResponse: data,
    isLoading,
  };
};
export default useModuleList;
