import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IPersonalDocumentListItem {
  id: string;
  jobseeker: string;
  documentType?: string;
  citizenship: {
    documentType: string;
    citizenImage: string[];
    issueDate: string;
    citizenshipNo: string;
  };
  passport: {
    documentType: string;
    passportImage: string[];
    issueDate: string;
    passportNo: string;
    expiryDate: string;
  };
  policeReport: {
    documentType: string;
    policeReportImage: string;
    issueDate: string;
    dispatchNo: string;
  };
  created_at: string;
  updated_at: string;
}
export type PersonalDocumentListResponse =
  IPaginationResponse<IPersonalDocumentListItem>;

export type PersonalDocumentDetailsResponse =
  IApiDetailsResponse<IPersonalDocumentListItem>;
