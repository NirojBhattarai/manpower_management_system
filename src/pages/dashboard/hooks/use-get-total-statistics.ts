import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { TotalStatisticsDetailResponse } from "../interface/dashboard-interface";

interface IGetTotalStatisticsProps {
  year: string;
  month: string;
}

const useGetTotalStatistics = ({ year, month }: IGetTotalStatisticsProps) => {
  const { data, isLoading } = useGetDataQuery<{
    data: TotalStatisticsDetailResponse;
    isLoading: boolean;
  }>({
    url: endpoints.dashboard.totalStatistics.list,
    tag: apiTags.dashboard.totalStatistics,
    params: { year, month },
  });

  return {
    totalStatisticsResponse: data,
    isLoading,
  };
};

export default useGetTotalStatistics;
