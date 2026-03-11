import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IOrientationInstituteDetails {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
type OrientationInstituteDetailsResponse =
  IApiDetailsResponse<IOrientationInstituteDetails>;

const useOrientationInstituteDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: OrientationInstituteDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.orientationInstitute.details.replace(":id", id ?? ""),
      tag: apiTags.orientationInstitute.details,
    },
    {
      skip: !id,
    },
  );

  return { orientationInstituteDetails: data, isLoading };
};
export default useOrientationInstituteDetails;
