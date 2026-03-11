import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IAppliedJobListItem {
  id: string;
  country: {
    id: string;
    country: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  jobvacancy: {
    id: string;
    jobTitle: {
      id: string;
      jobtitle: string;
    };
  };
  approvalStatus: {
    status: string;
    statusChangedBy: string;
    statusChangedAt: string;
  };
  description: string;
  interviewStatus: string;
  recruitmentStage: string;
  created_at: string;
  updated_at: string;
}
export type AppliedJobListResponse = IPaginationResponse<IAppliedJobListItem>;

export type AppliedJobDetailsResponse =
  IApiDetailsResponse<IAppliedJobListItem>;
