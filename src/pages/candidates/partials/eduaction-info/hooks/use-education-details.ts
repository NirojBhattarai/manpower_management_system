import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { EduactionDetailsResponse } from "../interface/education-info-interface";

const useEducationDetails = ({
  id,
  jobSeekerId,
}: {
  id: string | undefined;
  jobSeekerId: string | undefined;
}) => {
  const { data, isLoading } = useGetDataQuery<{
    data: EduactionDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.candidates.education.details
        .replace(":id", id ?? "")
        .replace(":jobSeekerId", jobSeekerId ?? ""),
      tag: apiTags.candidates.education.details,
    },
    {
      skip: !id,
    },
  );

  return { educationDetails: data, isLoading };
};
export default useEducationDetails;
