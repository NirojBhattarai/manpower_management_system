import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface ICompanyDetails {
  id: string;
  companyName: string;
  country: {
    id: string;
    country: string;
  };
  sector: string;
  currency: string;
  licenseNumberName: string;
  liscenseNumber: string;
  liscenseIssuedBy: string;
  liscenseImage: string;
  state: string;
  city: string;
  street: string;
  area: string;
  contactPersonName: string;
  contactNumber: string;
  email: string;
  officeAddress: string;
  websiteUrl: string;
}
type CompanyDetailsType = IApiDetailsResponse<ICompanyDetails>;
const useCompanyDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: CompanyDetailsType;
    isLoading: boolean;
  }>(
    {
      url: endpoints.company.details.replace(":id", id),
      tag: apiTags.company.details,
    },
    {
      skip: !id,
    },
  );
  return { companyDetails: data, isLoading };
};

export default useCompanyDetails;
