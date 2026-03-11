import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { PersonalDocumentDetailsResponse } from "../interface/personal-document-interface";

interface IDetailsProps {
  id: string;
}
export const useGetPersonalDocumentDetails = ({ id }: IDetailsProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: PersonalDocumentDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>(
    {
      url: endpoints.candidates.personalDocument.details.replace(
        ":jobSeekerId",
        id,
      ),
      tag: apiTags.candidates.personalDocument.details,
    },
    {
      skip: !id,
    },
  );
  return {
    personalDocumentDetails: data,
    isLoading,
    isError,
    isSuccess,
  };
};
