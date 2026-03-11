import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IEducationsListItem {
  id: string;
  jobseeker: string;
  level: string;
  instituteName: string;
  faculty: string;
  currentlyStudying: boolean;
  startDate: string;
  endDate: string;
  created_at: string;
  updated_at: string;
}
export type EducationListResponse = IPaginationResponse<IEducationsListItem>;

export type EduactionDetailsResponse = IApiDetailsResponse<IEducationsListItem>;
