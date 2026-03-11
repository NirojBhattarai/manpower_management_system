import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { VisaDetailsResponse } from "../interface/visa-interface";

const useVisaDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: VisaDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.visa.update.replace(":id", id ?? ""),
      tag: apiTags.visa.details,
    },
    {
      skip: !id,
    },
  );

  return { visaDetails: data, isLoading };
};
export default useVisaDetails;
