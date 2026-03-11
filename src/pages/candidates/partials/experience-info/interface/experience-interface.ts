import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IExperienceListItem {
  id: string;
  jobseeker: string;
  title: string;
  companyName: string;
  level: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export type ExperienceListResponse = IPaginationResponse<IExperienceListItem>;

export type ExperienceDetailsResponse =
  IApiDetailsResponse<IExperienceListItem>;
