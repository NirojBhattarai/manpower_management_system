import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface ICategoryDetails {
  id: string;
  industry: {
    id: string;
    industry: string;
  };
  category: string;
  icon: string;
}
type CategoryDetailsResponse = IApiDetailsResponse<ICategoryDetails>;
const useCategoryDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: CategoryDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.jobsetting.category.details.replace(":id", id ?? ""),
      tag: apiTags.category.details,
    },
    {
      skip: !id,
    },
  );

  return { categoryDetails: data, isLoading };
};

export default useCategoryDetails;
