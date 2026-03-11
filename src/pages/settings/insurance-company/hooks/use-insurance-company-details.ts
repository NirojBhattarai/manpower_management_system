import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IInsuranceCompanyDetails {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
type InsuranceCompanyDetailsResponse =
  IApiDetailsResponse<IInsuranceCompanyDetails>;

const useInsuranceCompanyDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: InsuranceCompanyDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.insuranceCompany.details.replace(":id", id ?? ""),
      tag: apiTags.insuranceCompany.details,
    },
    {
      skip: !id,
    },
  );

  return { insuranceCompanyDetails: data, isLoading };
};
export default useInsuranceCompanyDetails;
