import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { PersonalDetailsDetailsResponse } from "../interface/personal-details-interface";

interface IDetailsProps {
  id: string;
}
export const useGetPersonalDetails = ({ id }: IDetailsProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PersonalDetailsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>(
    {
      url: endpoints.candidates.personalDetails.details.replace(":id", id),
      tag: apiTags.candidates.personalDetails.details,
    },
    {
      skip: !id,
    },
  );
  return {
    personalDetailsData: data,
    isLoading,
    isError,
    isSuccess,
  };
};
