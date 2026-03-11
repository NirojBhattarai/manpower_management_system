import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IInsuranceListItem {
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
  insuranceCompany: {
    id: string;
    name: string;
  };
  policyNumber: string;
  validFrom: string;
  validTo: string;
  insuranceDocument: string;
  insuranceStatus: string;
  isMovedToShram: boolean;
  created_at: string;
  updated_at: string;
}
export type InsuranceListResponse = IPaginationResponse<IInsuranceListItem>;

export type InsuranceDetailsResponse = IApiDetailsResponse<IInsuranceListItem>;
