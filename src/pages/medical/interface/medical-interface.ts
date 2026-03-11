import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IMedicalListItem {
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
  hospital: {
    id: string;
    name: string;
  };
  examDate: string;
  reportFile: string;
  medicalStatus: string;
  remarks: string;
  isMovedToVisa: boolean;
  created_at: string;
  updated_at: string;
}
export type MedicalListResponse = IPaginationResponse<IMedicalListItem>;

export type MedicalDetailsResponse = IApiDetailsResponse<IMedicalListItem>;
