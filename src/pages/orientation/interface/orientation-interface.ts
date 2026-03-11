import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IOrientationListItem {
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
  orientationDate: string;
  orientationExpireDate: string;
  orientationStatus: string;
  isMovedToInsurance: boolean;
  created_at: string;
  updated_at: string;
}
export type OrientationListResponse = IPaginationResponse<IOrientationListItem>;

export type OrientationDetailsResponse =
  IApiDetailsResponse<IOrientationListItem>;
