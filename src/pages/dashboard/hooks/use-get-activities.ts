import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ActivitiesListResponse } from "../interface/activities-interface";

const useGetActivities = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: ActivitiesListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.dashboard.activities.list,
    tag: apiTags.dashboard.activities,
  });

  return {
    activitiesResponse: data,
    isLoading,
  };
};

export default useGetActivities;
