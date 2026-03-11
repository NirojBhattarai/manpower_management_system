import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { InsuranceDetailsResponse } from "../interface/insurance-interface";

const useInsuranceDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: InsuranceDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.insurance.update.replace(":id", id ?? ""),
      tag: apiTags.insurance.details,
    },
    {
      skip: !id,
    },
  );

  return { insuranceDetails: data, isLoading };
};
export default useInsuranceDetails;
