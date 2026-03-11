import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { LocationsListResponse } from "../interface/personal-details-interface";

const useLocationsList = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: LocationsListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.locations,
    tag: apiTags.getLocations,
  });

  return {
    LocationsListResponse: data,
    isLoading,
  };
};

export default useLocationsList;
