import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IJobOfferListItem {
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
  offerLetterNo: string;
  offerDate: string;
  joiningDate: string;
  offeredDocument: string;
  issuedBy: string;
  isMovedToMedical: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}
export type JobOfferListResponse = IPaginationResponse<IJobOfferListItem>;

export type JobOfferDetailsResponse = IApiDetailsResponse<IJobOfferListItem>;
