import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IJobTitleDetails {
  id: string;
  industry: {
    id: string;
    industry: string;
  };
  category: {
    id: string;
    category: string;
  };
  subcategory: {
    id: string;
    subcategory: string;
  };
  jobtitle: string;
  icon: string;
}
type JobTitleDetailsResponse = IApiDetailsResponse<IJobTitleDetails>;
const useJobTitleDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: JobTitleDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.jobsetting.jobTitle.details.replace(":id", id ?? ""),
      tag: apiTags.jobTitle.details,
    },
    {
      skip: !id,
    },
  );

  return { jobTitleDetails: data, isLoading };
};
export default useJobTitleDetails;
