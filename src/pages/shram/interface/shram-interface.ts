import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IShramListItem {
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
  instituteName: {
    id: string;
    name: string;
  };
  olsReferenceNo: string;
  approvalDate: string;
  approvalFile: string;
  shramStatus: string;
  isMovedToTicket: boolean;
  created_at: string;
  updated_at: string;
}
export type ShramListResponse = IPaginationResponse<IShramListItem>;

export type ShramDetailsResponse = IApiDetailsResponse<IShramListItem>;
