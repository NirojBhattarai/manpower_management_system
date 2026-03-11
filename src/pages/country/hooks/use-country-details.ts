import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface ICountryDetails {
  id: string;
  country: string;
  capital: string;
  currency: string;
  language: string;
}
type CountryDetailsResponse = IApiDetailsResponse<ICountryDetails>;

const useCountryDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: CountryDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.country.update.replace(":id", id ?? ""),
      tag: apiTags.country.details,
    },
    {
      skip: !id,
    }
  );

  return { countryDetails: data, isLoading };
};
export default useCountryDetails;
