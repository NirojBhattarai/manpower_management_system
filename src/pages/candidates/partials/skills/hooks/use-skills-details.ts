import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { SkillsDetailsResponse } from "../interface/skills-interface";

interface IDetailsProps {
  id: string;
}
export const useGetSkillDetails = ({ id }: IDetailsProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: SkillsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>(
    {
      url: endpoints.candidates.skillandLanguages.details.replace(":id", id),
      tag: apiTags.candidates.skillandLanguages.details,
    },
    {
      skip: !id,
    },
  );
  return {
    skillDetails: data,
    isLoading,
    isError,
    isSuccess,
  };
};
