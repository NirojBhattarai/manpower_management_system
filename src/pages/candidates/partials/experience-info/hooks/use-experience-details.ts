import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ExperienceDetailsResponse } from "../interface/experience-interface";

const useExperienceDetails = ({
  id,
  jobSeekerId,
}: {
  id: string | undefined;
  jobSeekerId: string | undefined;
}) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ExperienceDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.candidates.experience.update
        .replace(":id", id ?? "")
        .replace(":jobSeekerId", jobSeekerId ?? ""),
      tag: apiTags.candidates.experience.details,
    },
    {
      skip: !id,
    },
  );

  return { experienceDetails: data, isLoading };
};
export default useExperienceDetails;
