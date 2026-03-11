import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IJobvacancyListItem {
  id: string;
  country: {
    id: string;
    country: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  jobTitle: {
    id: string;
    jobtitle: string;
  };
  male: number;
  female: number;
  basicSalaryAED: number;
  basicSalaryNPR: number;
  workingHours: string;
  workingDays: string;
  contactPeriod: string;
  workingCity: string;
  experience: boolean;
  academicQualification: string;
  years: string;
}
export type JobVacancyListResponse = IPaginationResponse<IJobvacancyListItem>;

export type JobVacancyDetailsResponse =
  IApiDetailsResponse<IJobvacancyListItem>;
