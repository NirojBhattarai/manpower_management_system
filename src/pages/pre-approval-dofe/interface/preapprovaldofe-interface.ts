import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface DemandLetter {
  documentType: string;
  demandLetterFile: string;
}

export interface PowerOfAttorney {
  documentType: string;
  powerOfAttorneryFile: string;
}

export interface Contract {
  documentType: string;
  contractFile: string;
}

export interface Agreement {
  documentType: string;
  agreementFile: string;
}

export interface TradeLicense {
  documentType: string;
  tradeLicenseFile: string;
}

export interface QuotaApproval {
  documentType: string;
  quotaApprovalFile: string;
}

export interface Jobvacancy {
  jobTitle: string;
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
export interface IPreApprovalDofeListItem {
  id: string;
  country: {
    id: string;
    country: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  preApprovalCertificateNumber: string;
  preApprovalCertificatePDF: string;
  preApprovalDate: string;
  preApprovalValidity: string;
  preltNumber: string;
  chalaniNumber: string;
  documents: string[];
  demandLetter: DemandLetter;
  powerOfAttorney: PowerOfAttorney;
  contract: Contract;
  agreement: Agreement;
  tradeLicense: TradeLicense;
  quotaApproval: QuotaApproval;
  jobvacancy: Jobvacancy[];
  food: boolean;
  accomodation: boolean;
  transportation: boolean;
  freevisa: boolean;
  freeticket: boolean;
  overtime: boolean;
  created_date: string;
  updated_date: string;
}
export type PreApprovalDofeListResponse =
  IPaginationResponse<IPreApprovalDofeListItem>;

export type PreApprovalDofeDetailsResponse =
  IApiDetailsResponse<IPreApprovalDofeListItem>;
