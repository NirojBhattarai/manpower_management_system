import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ShramDetailsResponse } from "../interface/shram-interface";

const useShramDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ShramDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.shram.update.replace(":id", id ?? ""),
      tag: apiTags.shram.details,
    },
    {
      skip: !id,
    },
  );

  return { shramDetails: data, isLoading };
};
export default useShramDetails;
