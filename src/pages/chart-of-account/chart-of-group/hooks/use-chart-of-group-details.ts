import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ChartOfGroupDetailsResponse } from "../interface/chart-of-group-interface";

const useChartOfGroupDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ChartOfGroupDetailsResponse;
    isLoading: boolean;
  }>({
    url: endpoints.chartOfAccount.group.details.replace(":id", id),
    tag: apiTags.chartOfAccount.group.details,
  });
  return { chartOfGroupDetail: data, isLoading };
};

export default useChartOfGroupDetails;
