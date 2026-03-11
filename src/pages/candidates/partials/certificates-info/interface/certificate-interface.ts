import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface ICertificateListItem {
  id: string;
  jobseeker: string;
  title: string;
  organizationName: string;
  certificateFile: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export type CertificateListResponse = IPaginationResponse<ICertificateListItem>;

export type CertificateDetailsResponse =
  IApiDetailsResponse<ICertificateListItem>;
