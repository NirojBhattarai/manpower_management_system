import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IIndustryDetails {
  id: string;
  industry: string;
}

type IndustryDetailsResponse = IApiDetailsResponse<IIndustryDetails>;

const useIndustryDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: IndustryDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.jobsetting.industry.details.replace(":id", id ?? ""),
      tag: apiTags.industry.details,
    },
    {
      skip: !id,
    },
  );

  return { industryDetails: data, isLoading };
};
export default useIndustryDetails;
