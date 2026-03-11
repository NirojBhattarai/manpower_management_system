import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IMedicalInstituteDetails {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
type MedicalInstituteDetailsResponse =
  IApiDetailsResponse<IMedicalInstituteDetails>;

const useMedicalInstituteDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: MedicalInstituteDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.medicalInstitute.details.replace(":id", id ?? ""),
      tag: apiTags.medicalInstitute.details,
    },
    {
      skip: !id,
    },
  );

  return { medicalInstituteDetails: data, isLoading };
};
export default useMedicalInstituteDetails;
