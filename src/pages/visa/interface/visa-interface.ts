import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IVisaListItem {
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
  };
  company: {
    id: string;
    companyName: string;
  };
  applicationDate: string;
  approvalDate: string;
  visaExpireDate: string;
  visaStatus: string;
  visaFile: string;
  isMovedToOrientation: boolean;
  created_at: string;
  updated_at: string;
}
export type VisaListResponse = IPaginationResponse<IVisaListItem>;

export type VisaDetailsResponse = IApiDetailsResponse<IVisaListItem>;
