import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";
import {
  InterviewModeType,
  InterviewResultType,
  InterviewStatusType,
} from "@/pages/candidates/partials/applied-job/partials/schema/interview-schedule-schema";

export interface IInterviewScheduleListItem {
  id: string;
  jobseeker: {
    id: string;
    fullName: string;
  };
  jobTitle: {
    id: string;
    jobtitle: string;
  };
  jobVacancy: {
    id: string;
    jobTitle: {
      id: string;
      jobtitle: string;
    };
  };
  interviewDate: string;
  interviewMode: InterviewModeType;
  interviewLocation: string;
  interviewerName: string;
  interviewStatus: InterviewStatusType;
  company: {
    id: string;
    companyName: string;
  };
  scheduledBy: {
    name: string;
  };
  remarks: string;
  interviewResult: InterviewResultType;
  isMovedToJobOffer: boolean;
  jobOfferStatus: string;
  created_at: string;
  updated_at: string;
}
export type InterviewScheduleListResponse =
  IPaginationResponse<IInterviewScheduleListItem>;

export type InterviewScheduleDetailsResponse =
  IApiDetailsResponse<IInterviewScheduleListItem>;
