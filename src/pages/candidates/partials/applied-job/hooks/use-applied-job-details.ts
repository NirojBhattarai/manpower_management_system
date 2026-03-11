import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { AppliedJobDetailsResponse } from "../interface/applied-job-interface";

const useApppliedJobDetails = ({
  id,
  jobSeekerId,
}: {
  id: string | undefined;
  jobSeekerId: string | undefined;
}) => {
  const { data, isLoading } = useGetDataQuery<{
    data: AppliedJobDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.candidates.appliedJob.details
        .replace(":id", id ?? "")
        .replace(":jobSeekerId", jobSeekerId ?? ""),
      tag: apiTags.candidates.appliedJob.details,
    },
    {
      skip: !id,
    },
  );

  return { appliedJobDetails: data, isLoading };
};
export default useApppliedJobDetails;
