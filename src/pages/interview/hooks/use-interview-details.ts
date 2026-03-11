import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { InterviewScheduleDetailsResponse } from "@/pages/interview/interface/interview-schedule-interface";

const useInterviewDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: InterviewScheduleDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.interviewSchedule.update.replace(":id", id ?? ""),
      tag: apiTags.interviewSchedule.details,
    },
    {
      skip: !id,
    },
  );

  return { interviewDetails: data, isLoading };
};
export default useInterviewDetails;
