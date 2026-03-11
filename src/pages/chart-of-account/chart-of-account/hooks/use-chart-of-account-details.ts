import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ChartOfAccountDetailsResponse } from "../interface/chart-of-account-interface";

const useChartOfAccountDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ChartOfAccountDetailsResponse;
    isLoading: boolean;
  }>({
    url: endpoints.chartOfAccount.account.details.replace(":id", id),
    tag: apiTags.chartOfAccount.account.details,
  });
  return { chartOfAccountDetail: data, isLoading };
};

export default useChartOfAccountDetails;
